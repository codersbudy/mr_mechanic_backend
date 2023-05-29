
import { validationResult } from "express-validator"
import { Shop  } from "../model/shop.model.js";
import { response } from "express";

export const save = async (request, response, next) => {
    try {
        let already = await Shop.findOne({ licenceNo: request.body.licenceNo })
        if (already.length) {
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let shop = await Shop.create({});
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

            return response.status(200).json({ result:result, status: true })
        })
        .catch(err => {
            console.log(err);
            
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


export const nearByShop =async (request, response, next)=>{
    try{
     let shop = await Shop.find();
      shop = shop.filter((shopItem)=>(distance(22.715362124464562, 75.84329461593786,shopItem.latLong.split(",")[0],shopItem.latLong.split(",")[1])<=5.0))
      if(shop)
        return response.status(200).json({shop: shop, status: true, message: "near by shop found"});
 
      return response.status(200).json({shop: shop, status: false, message: "near by shop not found"})
    }
    catch(err) {
       return response.status(500).json({message: "Internal server error", status: false})
    }
 }
 
 function distance(lat1, lon1, lat2, lon2, unit) {
     console.log(lat1+" ---lat1"+lon1+"  --lon1"+lat2+"  --lat2"+lon2+"  --lon2");
       var radlat1 = Math.PI * lat1/180
       var radlat2 = Math.PI * lat2/180
       var theta = lon1-lon2
       var radtheta = Math.PI * theta/180
       var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
       if (dist > 1) {
         dist = 1;
       }
       dist = Math.acos(dist)
       dist = dist * 180/Math.PI
       dist = dist * 60 * 1.1515
       dist = dist * 1.609344 
       
     //   count++
       console.log(dist);
       return dist
    }