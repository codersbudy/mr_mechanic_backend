import mongoose from "mongoose"
const shopSchema = new mongoose.Schema({
         
    shopName:String,
    photo:String,
    licenceNo:String, 
    licencePhoto:String,
    address:String,
    shopKeeperId:String,
    rating:Number,
    shopStatus:String,
    latLong:String, 
    contact:String,
    categories:String,
});

export const Shop = mongoose.model("shop", shopSchema);
