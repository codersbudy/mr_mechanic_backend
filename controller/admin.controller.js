import {admin} from "../model/admin.model.js"
export const signIn = async (request, response, next) => {
    try {
        let admin = await admin.findOne({contact:request.body.contact});
        if (admin) {
            let status = await bcrypt.compare(request.body.password, admin.password);
            if (status) {
                let payload = { subject: admin.contact };
                console.log("payload", payload)
                console.log("contact", admin.contact);
                let token = Jwt.sign(payload, "coderHub");
                return response.status(200).json({ messages: "signIn successfully.....", status: true, token: token });
            }
            else
                return response.status(400).json({ err: "bad request", status: false });
        }
    }
    catch(err){
        return response.status(500).json({err:"internal server error",status :false});

    }
}


export const forgotPassword = async (request, response, next) => {
    try {
        console.log(request.body.contact)
        let admin = await admin.findOne({ contact: request.body.contact  })
        console.log(admin);
        if (admin) {
            console.log("inner if block");
            let email = admin.email;
        
            console.log("email", email);

            // ----------------------------------------------------------------------------------------------
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vickyhatagale505@gmail.com',
                    pass: 'Virshay@123'
                }
            });

            var mailOptions = {
                from: 'vickyhatagale505@gmail.com',
                to: 'abhisen332@gmail.com',
                subject: 'forgetting passwords',
                text: 'your email massage is received!'
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
export const setPassword = async (request, response, next) => {
    try {
        let admin = await admin.findOne({ email: request.body.email });
        if (admin) {
            if (admin.tempraryPassword == request.body.tempraryPassword) {
                let saltKey = await bcrypt.genSalt(10);
                let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
                request.body.password = encryptedPassword;
                let update = await admin.updateOne({ contact: customer.contact },( { password: request.body.password },{tempraryPassword:null}));
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

export const signout =(request,response,next)=>{
    console.log("signout successfull");

}