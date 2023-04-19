import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    id:String,
    customerName:String,
    email:String,
    contact:Number,
    password:String,  
    photo:String,
    rating:Number,
    tempraryPassword:Number,
});
export const Customer = mongoose.model("customer",customerSchema);