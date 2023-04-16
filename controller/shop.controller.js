
// import bcrypt from "bcryptsjs";
// import { validationResult } from "express-validator";
import { validationResult } from "express-validator"
import { Shop  } from "../model/shop.model.js";

export const save = async (request, response, next) => {
    try {
    
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let already = await Shop.find({ licenceNo: request.body.licenceNo })
        if (already.length) {

            console.log(already);
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        // let saltKey = await bcrypt.genSalt(10);
        // let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        // request.body.password = encryptedPassword;

        let shop = await Shop.create(request.body);
        return response.status(200).json({ message: shop, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const remove = (request, response, next) => {  
    console.log(request.body) 
    Shop.findByIdAndDelete({

        _id: request.body._id,        
    })
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const getList = (request, response, next) => {
    Shop.find({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })

        })
    }


export const id = (request, response, next) => {
    // console.log(request.params.customerId);
    console.log(request.params._id);

    Shop.findByPk(request.params._id,{
        attributes:{ exclude:['createdAt','updatedAt']}
    })
        .then(result => {
            console.log(result)
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error", status: false })
        })

}

export const update = async (request, response, next) => {

    try {
        let shop = await Shop.find({
        
                id: request.body.id,
        
        })
        if (shop) {
            let update = await Shop.findOneAndUpdate({
                shopName: request.body.shopName,
                photo: request.body.photo,
                address: request.body.address,
                latLong: request.body.latLong,
                contact: request.body.contact,
            }, {
             
                    id: request.body.id,
                
            })
            return response.status(200).json({ update: update, status: true });

        }
        return response.status(401).json({message:"bad request",status:false});

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false })
    }
}

export const updateStatus=async (request, response, next) => {

    try {
        let shop = await Shop.find({
            where: {
                id: request.body.id,
            }
        })
        if (shop) {
            let update = await Shop.findOneAndUpdate({
                shopStatus: request.body.shopStatus,
            }, {
            
                    id: request.body.id,
                
            })
            return response.status(200).json({ update: update, status: true });

        }
        return response.status(401).json({message:"bad request",status:false});

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false })
    }
}