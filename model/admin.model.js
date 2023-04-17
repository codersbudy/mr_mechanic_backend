import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
   email:String,
   password:String

});

export const admin = mongoose.model("customerRating",adminSchema);
