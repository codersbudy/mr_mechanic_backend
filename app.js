import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import admin from "./router/admin.router.js";
import customerRating from "./router/customerRating.js" ;
import mechanicRating from "./router/mechanicRating.js";
import Mechanic from "./router/mechanic.router.js";
import cors from "cors";

const app = express();
    const mongourl = "mongodb+srv://coderhub:ddEzvZ6iPe4pKJrF@cluster0.nalrul7.mongodb.net/mr_mechanic?retryWrites=true&w=majority";
    mongoose.connect(mongourl)
.then(result=>{
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use("/mechanic",Mechanic);
app.use("/admin",admin);
app.use("mechanicRating",mechanicRating);
app.use("customerRating",customerRating);
app.listen(3001,()=>{
    console.log("Server Started...");
});
})
.catch(err=>{
    console.log(err);
    console.log("Database not connected...");
})
