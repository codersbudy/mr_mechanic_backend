import { response } from "express";
import { Category } from "../model/category.model.js";

export const saveCategory=(request,response,next)=>{
    Category.create()
}