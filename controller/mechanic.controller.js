import { Mechanic } from "../model/mechanic.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Jwt from "../middleware/verification.js";
import Twilio from "twilio";

export const save = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let already = await Mechanic.findOne({ contact: request.body.contact })
        if (already) {
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let mechanic = await Mechanic.create(request.body);
        return response.status(200).json({ mechanic: mechanic, status: true });
    }
    catch (err) {

        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    try {
        let mechanic = await Mechanic.findOne({ contact: request.body.contact });
        if (mechanic) {
            let status = await bcrypt.compare(request.body.password, mechanic.password);
            if (status) {
                let payload = { subject: mechanic.email };
                let token = Jwt.sign(payload, "coderHub");
                return response.status(200).json({ messages: "signIn successfully.....", status: true, token: token, mechanic: { ...mechanic.toObject(), password: undefined, token: token } });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }
    catch (err) {

        return response.status(500).json({ err: "internal server error", status: false });
    }

}


export const getList = (request, response, next) => {
    Mechanic.find()
        .then(result => {

            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {

            return response.status(500).json({ err: "internal server error" });
        })
}

export const id = (request, response, next) => {

    Mechanic.findbyId(request.params.mechanicId, {

   })
        .then(result =>{
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })

}

export const remove = (request, response, next) => {
    Mechanic.deleteOne({ id: request.params.mechanicId })
        .then(result => {

            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const updateStatus = async (request, response, next) => {
    try {
        let update = await Mechanic.updateOne({ id: request.body.id }, { status: request.body.status, })
        if (update)
            return response.status(200).json({ update: update, status: true });

        return response.status(401).json({ message: "bad request", status: false });

    }
    catch (err) {

        return response.status(500).json({ err: "internal server error", status: false })
    }
}

export const forgotPassword = async (request, response, next) => {
    try {
        let mechanic = await Mechanic.findOne({ contact: request.body.contact })

        if (mechanic) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            var to = "+91" + request.body.contact;
                        const accountSid = 'ACcc7900d25b421f1bc2923e7317631638';
            const authToken = 'dffda79b48ff8bc2cdab0a6c03eb0f25';
            const client = Twilio(accountSid, authToken);
            const message = await client.messages.create({
                body: `Your OTP is: ${tempraryPassword}`,
                from: '+13203738823',
                to
            });
            Mechanic.updateOne({ contact: mechanic.contact }, { tempraryPassword: tempraryPassword })
                .then(result => {
                    return response.status(200).json({ result: 'email sent successful', mechanic: mechanic, status: true })
                })
                .catch(err => {
                    return response.status(500).json({ err: "internal server error", status: false });
                })
        }
        else {
            return response.status(450).json({ err: "customer not found", status: false })
        }
    }
    catch (error) {
  
        response.status(550).json({ error: 'Failed to send OTP' });
    }
}


export const verifyOtp = async (request, response, next) => {
    try {
        let mechanic = await Mechanic.findOne({ contact: request.body.contact });

        if (mechanic) {
         
            if (mechanic.tempraryPassword == request.body.tempraryPassword) {
                return response.status(200).json({ result: "Verify successfully", status: true });
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

export const setPassword = async (request, response, next) => {
    try {
        let mechanic = await Mechanic.findOne({ contact: request.body.contact });
        if (mechanic) {
            let saltKey = await bcrypt.genSalt(10);
            let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);

            request.body.password = encryptedPassword;
   
            let update = await Mechanic.updateMany({ contact: mechanic.contact }, {
                "$set": {
                    password: request.body.password, tempraryPassword: null
                }
            });
            if (update.modifiedCount)
                return response.status(200).json({ result: update, status: true });
            return response.status(400).json({ message: "bad ", status: false });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        
        response.status(500).json({ err: "internal server error", status: false });
    }
}

export const registrationVerifyOtp = async (request, response, next) => {
    try {
     
        let mechanic = await Mechanic.findOne({ contact: request.body.contact })

        if (!mechanic) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            var to = "+91" + request.body.contact;
                        const accountSid = 'ACcc7900d25b421f1bc2923e7317631638';
            const authToken = 'dffda79b48ff8bc2cdab0a6c03eb0f25';
            const client = Twilio(accountSid, authToken);


            const message = await client.messages.create({
                body: `Your OTP is: ${tempraryPassword}`,
                from: '+13203738823',
                to
            });

            return response.status(200).json({ otp: tempraryPassword, status: true });
        }
        else {
 
            return response.status(450).json({ err: "contact already register please log in", status: false })
        }
    }
    catch (error) {
     
        response.status(550).json({ error: 'Failed to send OTP' });
    }
}
