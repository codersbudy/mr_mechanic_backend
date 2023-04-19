import mongoose from "mongoose";
const customerRatingSchema = new mongoose.Schema({
    rating:Number,
    feedback:String


});

export const customerRating = mongoose.model("customerRating",customerRatingSchema);
