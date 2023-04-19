import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import shopkeeperRouter from './routes/shopkeeper.route.js';
import customerRouter from './routes/customer.route.js';
import shopRouter from './routes/shop.route.js';
import bookingRouter from "./routes/booking.route.js";
import categoryRouter from "./routes/category.route.js";
import dropDownRouter from "./routes/dropDown.route.js";
import admin from "./router/admin.router.js";
import customerRating from "./router/customerRating.js" ;
import mechanicRating from "./router/mechanicRating.js";
import Mechanic from "./router/mechanic.router.js";
// import adminRouter from "./routes/admin.route.js"
import cors from "cors";

const app = express();
mongoose.connect("mongodb+srv://coderhub:ddEzvZ6iPe4pKJrF@cluster0.nalrul7.mongodb.net/mr_mechanic?retryWrites=true&w=majority")
.then(result=>{
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use("/shopkeeper",shopkeeperRouter);
app.use("/customer", customerRouter);
app.use("/booking",bookingRouter);
app.use("/category",categoryRouter);
app.use("/shop",shopRouter);
app.use("/dropDown",dropDownRouter);
app.use("/mechanic",Mechanic);
app.use("/admin",admin);
app.use("/mechanicRating",mechanicRating);
app.use("/customerRating",customerRating);
app.listen(3010,()=>{
    console.log("Server Started...");
  });
})
.catch(err=>{
    console.log(err);
    console.log("Database not connected...");
})
