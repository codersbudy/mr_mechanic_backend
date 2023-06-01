import mongoose from "mongoose"
const shopSchema = new mongoose.Schema({
         
    shopName:String,
    photo:String,
    licenceNo:String, 
    licencePhoto:String,
    address:String,
    shopKeeperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop"
    },
    rating:Number,
    shopStatus:String,
    latLong:String, 
    contact:Number,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop"
    },
});

export const Shop = mongoose.model("shop", shopSchema);
