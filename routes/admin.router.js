import express  from "express";

import { signIn,forgotPassword} from "../controller/admin.controller.js";
import { verifyToken } from "../middleware/verification.js";


const router = express.Router();

router.post("/signIn",signIn);
router.post("/forgotPassword",forgotPassword);

export default router;


