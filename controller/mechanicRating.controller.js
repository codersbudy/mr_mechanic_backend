import { request, response } from "express";
import { Mechanic } from "../model/mechanic.model.js";
import  {mechanicRating}  from "../model/mechanicRating.model.js"

export const ratinglist = (request, response, next) => {
    mechanicRating.find()
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error" });
        })
}


export const ratingsave = (request, response, next) => {
    mechanicRating.create()
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error" });
        })
}

export const bulkSaveRating=(request,response,next)=>{
    mechanicRating.insertMany(request.body.mechanicRating)
     .then((result)=>{
        return response.status(200).json({result:result,status:true})
     })
     .catch((err)=>{
        return response.status(500).json({error:"internal server error",status:false})
     })
}

export const getMechanicRating=(request,response,next)=>{
    mechanicRating.find({mechanicId:request.body.mechanicId},"rating")

    .then((result)=>{
        console.log(result);
        return response.status(200).json({rating:result,status:false})
    })
    .catch((err)=>{
        return response.status(500).json({err:"internal server ",status:false})
    })
}