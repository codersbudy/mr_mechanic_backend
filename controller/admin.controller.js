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
export const signout =( request,response,next)=>{

};
export const forgetpassword =async(request,response,next)=>{
    try{
        let saltKey = bcrypt.gensalt(10);
        encryptpassword = bcrypt.hash(request.body.password,saltkey);

        let update = await admin.update({contact:request.body.contact}),({password:request.body.password});
        if(update.modifiedcount)
        return response.status(200).json({message:"password change", status:true})
        return response.status(400).json({message:"bad request" , status :false});

    }
    catch(err){
        return response.status()
    }
}

