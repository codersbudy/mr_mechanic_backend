import mongoose from "mongoose";
const shopRatingSchema = new mongoose.Schema({
    shopId:{
      require:true,
      type:mongoose.Schema.Types.ObjectId,
      ref:"mechanic"
    },
    rating:{
        require:true,
        type:Number
    }
});
export const shopRating = mongoose.model("shopRating",shopRatingSchema);