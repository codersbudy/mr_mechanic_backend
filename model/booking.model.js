
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
    location:{
      type:String,
      require:true,
    
    },
    vehicleNo:{
      type:String,
      require:false,
  },
    
    categoryId:{
        type:String,
        require:false,
    },
    shopKeeperId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"shopkeeper"
    },
    vehicleName:{
      type:String,
      require:true,
    },
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