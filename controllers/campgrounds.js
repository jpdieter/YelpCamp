//moved all logic from campgrounds.js into this controller file. contains all logic for render calls.

const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN; //use env file for token
const geocoder = mbxGeocoding({ accessToken: mapBoxToken }); //variable will use both methods and link accessToken to them

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
  
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground); //make campground with everything in req.body.campground
    campground.geometry = geoData.body.features[0].geometry; //add on gemoetry from geocoding api
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename})) //add differnt file ULS from cloudinary
    campground.author = req.user._id; //set campground author = to user
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground, msg: req.flash("success")});
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }); //otherwise update campground
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename })); //create an array by looping over values
    campground.images.push(...imgs); //pass array data on to campground with push using the spread operator for different array values
    await campground.save()
    //if update campground > pull from images array all images where filename of image is in the req.body.deleteImages array
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async(req, res) =>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!')
    res.redirect('/campgrounds')
}