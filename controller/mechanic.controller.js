import { Mechanic } from "../model/association.js";
import bcrypt from "bcryptjs";
import Jwt from "../middleware/verification.js"
import { validationResult } from "express-validator";

export const save = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let already = await Mechanic.findOne({
            contact: request.body.contact

        })
        console.log(already);
        if (already) {
            console.log(already);
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let saltKey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
        request.body.password = encryptedPassword;
        let mechanic = await Mechanic.save(request.body);
        return response.status(200).json({ mechanic: mechanic, status: true });
    }
    catch (err) {
        console.log(err);
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
                console.log("payload", payload)
                console.log("email", mechanic.email);
                let token = Jwt.sign(payload, "coderHub");
                return response.status(200).json({ messages: "signIn successfully.....", status: true, token: token });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false });
    }

}
export const signout =( request,response,next)=>{

};

export const getList = (request, response, next) => {
    Mechanic.find(
        {
            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'aadharNo'] },
        }
    )
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error" });
        })
}

export const id = (request, response, next) => {
    console.log(request.params.shopeeperId);

    Mechanic.findbyId(request.params.mechanicId, {
        attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'aadharNo'] }
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

export const remove = (request, response, next) => {
    Mechanic.deleteOne({ id: request.params.mechanicId })
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "internal server error", status: false })
        })
}

export const updateStatus = async (request, response, next) => {
    try {
        let update = await Mechanic.updateOne({ id: request.body.id }, { status: request.body.status, })
        if (update.modifyCount)
            return response.status(200).json({ update: update, status: true });
        console.log(update);
        return response.status(401).json({ message: "bad request", status: false });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false })
    }
}