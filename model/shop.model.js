import mongoose from "mongoose"
const shopSchema = new mongoose.Schema({
         
    shopName:String,
    photo:String,
    licenceNo:String, 
    licencePhoto:String,
    address:String,
    shopKeeperId:Number,
    rating:Number,
    shopStatus:String,
    latLong:String, 
    contact:Number
    
});

export const Shop = mongoose.model("shop", shopSchema);
