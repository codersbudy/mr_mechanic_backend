import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import shopkeeperRouter from './routes/shopkeeper.route.js';

import customerRouter from './routes/customer.route.js'
import categoryRouter from './routes/category.route.js';
import bookingRouter from './routes/booking.route.js';
import shopRouter from './routes/shop.route.js';
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
app.listen(3010,()=>{
    console.log("Server Started...");
  });
})
.catch(err=>{
    console.log(err);
    console.log("Database not connected...");
})
