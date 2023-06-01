import express from 'express';


import {save,signIn,getList,id,remove,updateStatus,forgotPassword,setPassword,verifyOtp,registrationVerifyOtp} from '../controller/mechanic.controller.js'
import { verifyToken } from '../middleware/verification.js';
import { body } from 'express-validator';


const router = express.Router();

router.post("/save",
body("mechanicName").notEmpty(),
body("contact").notEmpty(),
body("password").notEmpty(),
body("password", "password must have minimum 8 later and maximum 16 later").isLength({
    min: 8,
    max: 16
})
,save);
router.post("/signIn",signIn)
router.get("/getList",verifyToken,getList);
router.get("/id/:mechanicId",verifyToken,id);
router.get("/remove/:mechanicId",verifyToken,remove);
router.get("/updateStatus",verifyToken,updateStatus);
router.post("/forgotPassword", forgotPassword);
router.post("/tempraryPassword",verifyOtp);
router.post("/setPassword",setPassword);
router.post("/verifyOtp",body("customerName").notEmpty(),
body("contact","please enter contact").notEmpty(),
body("password", "please enter password").notEmpty(),
body("password", "password must have minimum 8 later and maximum 16 later").isLength({
    min: 8,
    max: 16
}),registrationVerifyOtp)
export default router;