
import { validationResult } from "express-validator"
import { Shop  } from "../model/shop.model.js";
import { response } from "express";

export const save = async (request, response, next) => {
    try {
        let already = await Shop.findOne({ licenceNo: request.body.licenceNo })
        if (already.length) {
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let shop = await Shop.create(request.body);
        return response.status(200).json({ message: shop, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const remove = (request, response, next) => {  
    console.log(request.body) 
    Shop.findByIdAndDelete(request.body._id)
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const getList = (request, response, next) => {
    Shop.find()
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const id = (request, response, next) => {
    console.log(request.params.shopId);
       Shop.findById(request.params.shopId)
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const update = async (request, response, next) => {
    try {
        let update = await Shop.findOneAndUpdate({shopName: request.body.shopName,
                photo: request.body.photo,
                address: request.body.address,
                latLong: request.body.latLong,
                contact: request.body.contact,
            }, {
                    _id: request.body._id,
            })
            return response.status(200).json({ update: update, status: true });
         }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false })
    }
}

export const updateStatus=async (request, response, next) => {
   try {
       let update = await Shop.findOneAndUpdate({
                shopStatus: request.body.shopStatus,
            }, {
                    _id: request.body._id
            })
            return response.status(200).json({ update: update, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false })
    }
}