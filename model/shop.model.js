import mongoose from "mongoose"
const shopSchema = new mongoose.Schema({     
    shopName:String,
    photo:String,
    address:String,
    rating:Number,
    shopStatus:String,
    latLong:String, 
    contactNo:String,
    categories:String,
    password:String,
    });

export const Shop = mongoose.model("shop", shopSchema);
