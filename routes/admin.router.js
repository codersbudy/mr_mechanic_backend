import express  from "express";
import { verifyToken } from "../middleware/varification.js";
import { signIn,signout,forgotPassword} from "../controller/admin.controller.js";


const router = express.Router();

router.post("/signIn",signIn);
router.get("/signout",verifyToken,signout);
router.post("/forgotPassword",forgotPassword);

export default router;


