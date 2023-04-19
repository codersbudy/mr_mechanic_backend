import mongoose from "mongoose";
const mechanicRatingSchema = new mongoose.Schema({
    rating:Number,
    feedback:String


});

export const mechanicRating = mongoose.model("mechanicRating",mechanicRatingSchema);