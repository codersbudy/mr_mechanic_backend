import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import shopkeeperRouter from './routes/shopkeeper.route.js';
import ProductRouter from "./routes/product.route.js"
import cors from "cors";

const app = express();
mongoose.connect("mongodb+srv://coderhub:ddEzvZ6iPe4pKJrF@cluster0.nalrul7.mongodb.net/mr_mechanic?retryWrites=true&w=majority")
.then(result=>{
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use("/shopkeeper",shopkeeperRouter);
app.use("/product",ProductRouter);
app.listen(5000,()=>{
    console.log("Server Started...");
});
})
.catch(err=>{
    console.log(err);
    console.log("Database not connected...");
})
