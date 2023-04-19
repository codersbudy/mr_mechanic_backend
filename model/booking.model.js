
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
      },  
    shopId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"shop"
    },
    problem:String,
    location:String,
    vehicleNo:String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    shopKeeperId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"shopkeeper"
    },
    vehicleName:String,
    status:String,
    mechanicId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"mechanic"
    },    
    actualProblem:String,
    billAmmount:Number,
    date:String,
    time:String,
    latLong:String
});
export const Booking = mongoose.model("booking",bookingSchema);