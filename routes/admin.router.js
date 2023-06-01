import express from "express";

import { signIn, signout, forgotPassword, signUp, appPerformance, setPassword, verifyOtp } from "../controller/admin.controller.js";

import { verifyToken } from "../middleware/verification.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/signout", verifyToken, signout);
router.post("/forgotPassword", forgotPassword);
router.get("/applictionPerformance", appPerformance);
router.post("/setPassword", setPassword)
router.post("/verifyOtp", verifyOtp)

export default router;


