import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
   email:String,
   password:String,
   tempraryPassword:Number

});

export const admin = mongoose.model("admin",adminSchema);
