const express = require('express')
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review')
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError')
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require ('../middleware');


//added isLoggedIn to prevent someone being able to send a post request who is not logged in
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReviews))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync (reviews.deleteReview))

module.exports = router;