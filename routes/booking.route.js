import express from 'express';
const router=express.Router();
// ,customerHistory,mechanicHistory,shopHistory
import { request,updateStatus ,addMechanic,bill,id} from '../controller/booking.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verification.js';
router.post("/request",verifyToken,request);
router.post("/updateStatus",verifyToken,updateStatus);
router.post("/addMechanic", verifyToken,addMechanic )
router.post("/bill",verifyToken,bill);
// router.get("/customerHistory",verifyToken,customerHistory);
// router.get("/mechanicHistory",verifyToken,mechanicHistory);
// router.get("/shopHistory",verifyToken,shopHistory);
router.post("/id",verifyToken,id);
export default router;