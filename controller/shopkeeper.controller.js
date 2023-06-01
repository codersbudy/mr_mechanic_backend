import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Shopkeeper } from "../model/shopkeeper.model.js";
import Jwt from "../middleware/verification.js";
import nodemailer from 'nodemailer';
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

    let shopkeeper = await Shopkeeper.create({ shopkeeperName: request.body.shopkeeperName, contact: request.body.contact, password: request.body.password, tempraryPassword: null, email: request.body.email });
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
    return response.status(500).json({ err: "bad request", status: false });

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

        let shopkeeper = await Shopkeeper.findOne({ contact: request.body.contact })
        console.log(shopkeeper);
        if (shopkeeper) {

            console.log("inner try");
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            let email = shopkeeper.email;
            console.log(email);
            let contact = request.body.contact;
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
                   return response.status(500).json({message:"email not sent",status:false});
                } else {
                    console.log("inner else");
                    Shopkeeper.updateOne({ contact: shopkeeper.contact }, { tempraryPassword: tempraryPassword })
                        .then(result => {
                            console.log(result);
                            response.status(200).json({ result: 'email sent successful', shopkeeper:shopkeeper, status: true })

                        })
                        .catch(err => {
                            console.log(err);
                            response.status(500).json({ err: "internal server error", status: false });
                        })
                }
            });

            // ----------------------------------------------------------------------------------------------   
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
          return response.status(500).json({ message: "email not sent", status: false });
        } else {
          console.log("inner else");
          Shopkeeper.updateOne({ contact: shopkeeper.contact }, { tempraryPassword: tempraryPassword })
            .then(result => {
              console.log(result);
              response.status(200).json({ result: 'email sent successful', shopkeeper: shopkeeper, status: true })

            })
            .catch(err => {
              console.log(err);
              response.status(500).json({ err: "internal server error", status: false });
            })
        }
      });

      // ----------------------------------------------------------------------------------------------   
    }
    else
      return response.status(401).json({ message: "this shopkeeper not available", status: false });
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ err: "internal server error", status: false });
  }
}

export const verifyOtp = async (request, response, next) => {
  try {
    let shopkeeper = await Shopkeeper.findOne({ contact: request.body.contact });
    console.log(shopkeeper);
    if (shopkeeper) {
      if (shopkeeper.tempraryPassword == request.body.tempraryPassword) {
        return response.status(200).json({ result: "Verify successfully", status: true });
      }
      else
        return response.status(401).json({ message: "your temprary password not match", status: false });
    }
    else
      return response.status(401).json({ message: "bad request", status: false });
  }
  catch (err) {
    console.log(err);
    response.status(500).json({ err: "internal server error", status: false });
  }
}
export const bulkSave = (request, response) => {
  // request.body.shopdetails.map(async(shop,index)=>{
  //      let saltKey = await bcrypt.genSalt(10);
  //      shop.password = await bcrypt.hash("Coder@123", saltKey);

  // })
  Shopkeeper.insertMany(request.body.shopkeeperdetails)
    .then(result => {
      return response.json({ message: "save", result: result });
    }).catch(err => {
      console.log(err);
      return response.json({ error: "error" });
    })
}

export const setPassword = async (request, response, next) => {
  try {
    let shopkeeper = await Shopkeeper.findOne({ contact: request.body.contact });
    if (shopkeeper) {
      let saltKey = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
      request.body.password = encryptedPassword;
      let update = await Shopkeeper.updateOne({ contact: shopkeeper.contact }, ({ password: request.body.password }, { tempraryPassword: null }));
      if (update)
        return response.status(200).json({ result: update, status: true });
      return response.status(400).json({ message: "bad ", status: false });
    }
    else
      return response.status(401).json({ message: "bad request", status: false });
  }
  catch (err) {
    console.log(err);
    response.status(500).json({ err: "internal server error", status: false });
  }
}



