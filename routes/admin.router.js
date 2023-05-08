import express  from "express";

import { signIn,signout,forgotPassword} from "../controller/admin.controller.js";
import { verifyToken } from "../middleware/verification.js";


const router = express.Router();

router.post("/signIn",signIn);
router.get("/signout",verifyToken,signout);
router.post("/forgotPassword",forgotPassword);

export default router;


