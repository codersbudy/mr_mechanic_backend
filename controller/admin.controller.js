// import {Admin} from "../model/admin.model.js"
export const signIn = async (request, response, next) => {
    try {
        let admin = await Admin.findOne({email:request.body.email});
        if (admin) {
            let status = await bcrypt.compare(request.body.password, admin.password);
            if (status) {
                let payload = { subject: Admin.contact };
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
        let admin = await Admin.findOne({ email:request.body.email })
        if (admin) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            let email = customer.email;
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
                   return response.status(200).json({message:"email not sent",status:false});
                } else {
                    Admin.updateOne({ email:admin.email }, { tempraryPassword: tempraryPassword })
                        .then(result => {
                            response.status(200).json({ result: 'email sent successful', status: true })

                        })
                        .catch(err => {
                            response.status(500).json({ err: "internal server error", status: false });
                        })
                }
            });
        }
        else
            return response.status(401).json({ message: "this customer not available", status: false });
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}

export const setPassword = async (request, response, next) => {
    try {
        let admin = await Admin.findOne({ email: request.body.email });
        if (admin) {
            if (admin.tempraryPassword == request.body.tempraryPassword) {
                let saltKey = await bcrypt.genSalt(10);
                let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
                request.body.password = encryptedPassword;
                let update = await Admin.updateOne({ email: admin.email },( { password: request.body.password },{tempraryPassword:null}));
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
    return response.status(200).json({ message:"signout successfull ",status :true})

}