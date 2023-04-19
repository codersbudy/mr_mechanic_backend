import bcrypt from "bcryptjs";
import { request, response } from "express";
import Jwt from "../middleware/verification.js"
import { validationResult } from "express-validator";
import { Customer } from '../model/customer.model.js'
import nodemailer from 'nodemailer';

export const signUp = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });



        let already = await Customer.find({
            contact: request.body.contact,
        })
        if (already.length)
            return response.status(200).json({ err: "account is already register.....", status: true });
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let customer = await Customer.create({ 'contact': request.body.contact, 'password': request.body.password, 'customerName': request.body.customerName });
        return response.status(200).json({ customer: customer, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    try {
        let customer = await Customer.find({ contact: request.body.contact });
        if (customer.length) {
            let status = await bcrypt.compare(request.body.password, customer[0].password);
            if (status) {
                let payload = { subject: customer.contact };
                let token = Jwt.sign(payload, "coderHub");
                return response.status(200).json({ messages: "signIn successfully.....", status: true, token: token });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }

}


export const updataProfile = async (request, response, next) => {
    try {
        let status = await Customer.findOne(request.body.contact)
        if (status) {
            let update = await Customer.updateOne({ contact: request.body.contact }, { photo: request.body.photo, customerName: request.body.customerName, email: request.body.email })
            return response.status(200).json({ result: update, status: true });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        return response.status(500).json({ err: "internal server ", status: false });
    }
}


export const getList = (request, response, next) => {
    Customer.find()
        .then(result => {
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error" });
        })
}

export const id = async (request, response, next) => {
    try{
      let customer= await Customer.findOne({ contact: request.body.contact })
          customer?response.status(200).json({result:customer,status:true}):response.status(401).json({message:"wrong contact number",status:false});
    }
    catch(err){
        return response.status(500).json({ err: "internal server error", status: false }) 
    }
}

export const forgotPassword = async (request, response, next) => {
    try {

        //    console.log(tempraryPassword);
        // console.log(request.body.contact)
        let customer = await Customer.findOne({ contact: request.body.contact })
        console.log(customer);
        if (customer) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            let email = customer.email;
            let contact = request.body.contact;
            console.log("email", email);
            console.log("mobile no.", customer.contact);

            // ----------------------------------------------------------------------------------------------
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'abhisen332@gmail.com',
                    pass: 'jmdnxihetfwoumic'
                }
            });

            var mailOptions = {
                from: 'abhisen332@gmail.com',
                to: email,
                subject: "forget password in mr_mechanic",
                html: "<h1>" + tempraryPassword + "</h1>",
            };


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    Customer.updateOne({ contact: customer.contact }, { tempraryPassword: tempraryPassword })
                        .then(result => {
                            response.status(200).json({ result: 'email sent successful', status: true })

                        })
                        .catch(err => {
                            response.status(500).json({ err: "internal server error", status: false });
                        })
                }
            });

            // ----------------------------------------------------------------------------------------------   
        }
        else
            return response.status(401).json({ message: "this customer not available", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false });
    }
}

export const signOut = (request, response, next) => {
    console.log("sign out");
}

export const setPassword = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({ contact: request.body.contact });
        if (customer) {
            if (customer.tempraryPassword == request.body.tempraryPassword) {
                let saltKey = await bcrypt.genSalt(10);
                let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
                request.body.password = encryptedPassword;
                let update = await Customer.updateOne({ contact: customer.contact },( { password: request.body.password },{tempraryPassword:null}));
                return response.status(200).json({result:update,status:true});
            }
            else
                return response.status(401).json({ message: "your temprary password not match", status: false });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        response.status(500).json({ err: "internal server error", status: false });
    }
}