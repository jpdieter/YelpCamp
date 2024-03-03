//review schema requires text in body and number rating
//linked to reviews.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: { //links author of review to user
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model("Review", reviewSchema);
