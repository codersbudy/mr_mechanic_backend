import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Shopkeeper } from "../model/shopkeeper.model.js";
import Jwt from "../middleware/verification.js";

export const signUp = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let already = await Shopkeeper.findOne({ contact: request.body.contact })
        if (already)
            return response.status(200).json({ err: "account is already register.....", status: true });
        let saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);

        let shopkeeper = await Shopkeeper.create(request.body);
        return response.status(200).json({ message: "registration successfull...", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    try {
        let shopkeeper = await Shopkeeper.findOne({
            contact: request.body.contact
        });
        if (shopkeeper) {
            let status = await bcrypt.compare(request.body.password, shopkeeper.password);
            if (status) {
                let payload = { subject: shopkeeper.email };
                let token = Jwt.sign(payload, "ccooddeerrHHuubb");
                shopkeeper.password = undefined;
                return response.status(200).json({ messages: "signIn successfully.....", result: shopkeeper, status: true, token: token });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }

}

export const signOut = (request, response, next) => { }

export const updataProfile = async (request, response, next) => {
    try {
        let update = await Shopkeeper.updateOne({ _id: request.body.id }, { photo: request.body.photo, email: request.body.email, shopkeeperName: request.body.shopkeeperName })
        if (update.modifiedCount)
            return response.status(200).json({ message: "profile is updated...", status: true });
        return response.status(400).json({ error: "bad request", status: false });

    } catch (err) {
        return response.status(500).json({ error: "internal server error ", status: false });
    }

}


export const getList = (request, response, next) => {

    Shopkeeper.find()
        .then(result => {
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error" });
        })
}

export const byId = (request, response, next) => {

    Shopkeeper.findById(request.body.id)
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })

}

export const forgetPassword = async (request, response, next) => {
    try {
        let saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);
        let update = await Shopkeeper.updateOne({ _id: request.body.id }, { password: request.body.password })
        if (update.modifiedCount)
            return response.status(200).json({ message: "Password successfully change...", status: true });
        return response.status(400).json({ error: "bad request", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}



