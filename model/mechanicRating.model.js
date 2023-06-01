import mongoose from "mongoose";
const mechanicRatingSchema = new mongoose.Schema({
    mechanicId:{
      require:true,
      type:mongoose.Schema.Types.ObjectId,
      ref:"mechanic"
    },
    rating:{
        require:true,
        type:Number
    }
});
export const mechanicRating = mongoose.model("mechanicRating",mechanicRatingSchema);