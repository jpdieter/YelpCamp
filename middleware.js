const { campgroundSchema, reviewSchema } = require('./schemas.js'); //joi json javascript object schema validates data from req.body
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review')

//created for middleware and added const to campgrounds.js > router.get isLoggedIn
module.exports.isLoggedIn = (req, res, next) => {
    //passport allows req.user to track current user
    // console.log('req.user...', req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; //return to original url
        req.flash('error', 'you must be signed in')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//middleware that verifies if a user is the author of a campground
module.exports.isAuthor = async(req, res, next) => { //middleware async function
    const { id } = req.params; //use id from req.params in URL
    const campground = await Campground.findById(id); //query database for campground ID
    if (!campground.author.equals(req.user._id)){ //if campground.author != user redirect
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next(); //user does have permission to change campground
}

module.exports.isReviewAuthor = async(req, res, next) => { //middleware async function
    const { id, reviewId } = req.params; //use id from req.params in URL
    const review = await Review.findById(reviewId); //query database for campground ID
    if (!review.author.equals(req.user._id)){ //if campground.author != user redirect
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next(); //user does have permission to change campground
}


module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//used to save the returnTo value from the session- 
//(req.session.returnTo) to res.locals:
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}