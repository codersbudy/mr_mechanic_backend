import mongoose from "mongoose";
const mechanicSchema = new mongoose.Schema({
    
    mechanicname:String,
    email : String,
   adharcard:String,
   contact:Number,
   shopId:Number,
   rating :Number,
   password:String,
   status:String,
   photo:String,
});

export const Mechanic = mongoose.model("mechanic",mechanicSchema);

