import express from 'express';
import { byId, forgetPassword, getList, signIn, signOut, signUp, updataProfile} from '../controller/shopkeeper.controller.js';
import { body } from "express-validator";
import { verifyToken } from '../middleware/verification.js';

// ,signIn,updataPhoto ,updateEmail,getList,id
const router=express.Router();

router.post("/signUp",
body("shopkeeperName").notEmpty(),
body("contact","Invalid contact number").isLength({ min:10,max:10}),
body("contact","only digit is allow").isNumeric(),
body("password","please enter password").notEmpty(),
body("password","password must have minimum 8 later and maximum 16 later").isLength({min:8,max:16}),
signUp);

router.post("/signIn",signIn);
// router.post("/signOut",signOut);
router.post("/updateProfie",verifyToken,updataProfile);
router.get("/list",verifyToken,getList);
router.post("/byId",verifyToken,byId);
router.post("/forgetPassword",forgetPassword); //otp matchinig raha hai...

export default router;