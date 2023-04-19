import express from 'express';
import { body } from 'express-validator';
// import { verify } from 'jsonwebtoken';

import { signUp,signIn, updataProfile,getList,id,forgotPassword,setPassword} from '../controller/customer.controller.js';
import { verifyToken } from '../middleware/verification.js';
const router = express.Router();

router.post("/signUp",
    body("customerName").notEmpty(),
    body("password", "please enter password").notEmpty(),
    body("password", "password must have minimum 8 later and maximum 16 later").isLength({
        min: 8,
        max: 16
    }),

    signUp);

router.post("/signIn", signIn);


router.post("/updataProfile", updataProfile);
router.get("/getList", verifyToken, getList);
router.post("/id", id);
router.post("/forgotPassword", forgotPassword)
router.post("/setPassword",setPassword);
// router.get("/signOut", verifyToken, signOut);

export default router;