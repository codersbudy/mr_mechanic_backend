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
        let customer = await Customer.find({contact: request.body.contact});
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


export const updataProfile = (request, response, next) => {
    Customer.updateOne({ contact: request.body.contact },  { photo: request.body.photo, customerName: request.body.customerName, email: request.body.email })
        .then(result => {
            return response.status(200).json({ result: result, status: false });
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server ", status: false });
        })

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

export const id = (request, response, next) => {
    Customer.findOne({ contact: request.body.contact })
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })

}

export const forgotPassword = async (request, response, next) => {
    try {
        console.log(request.body.contact)
        let customer = await Customer.findOne({ where: { contact: request.body.contact } })

        console.log(customer);
        if (customer) {
            console.log("inner if block");
            let email = customer.email;
            let mobileNO = request.body.contact;
            console.log("email", email);
            console.log("mobile no.", customer.contact);

            // ----------------------------------------------------------------------------------------------
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'abhisen332@gmail.com',
                    pass: 'cxgnffbnmxeujtxa'
                }
            });

            var mailOptions = {
                from: 'abhisen332@gmail.com',
                to: 'vickyhatagale505@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            // ----------------------------------------------------------------------------------------------
            return response.status(200).json({ message: "successfully set password....." });

        }
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
