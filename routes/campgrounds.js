//file used to look at routes, set up middleware and pass in controller method defined in campground.js
//using express router

const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground'); 
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware.js'); //middleware that verifies user is logged in
const campgrounds = require('../controllers/campgrounds'); //represents campground controller object with different methods
const multer  = require('multer'); //uploads to cloudinary and provides req.files which you can use to do stuff (loop over them with map)
const {storage} = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
//logic is stored in controller directory in order to clean up routes and make things look more organized
//uses campgrounds variable which is a controller object with different methods
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,  catchAsync(campgrounds.createCampground)) //create a campground

//form to make new campground
//uses campgrounds.js controller with the campgrounds object and renderNewForm name
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) //show page
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;