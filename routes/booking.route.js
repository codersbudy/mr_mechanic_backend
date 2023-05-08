import express from 'express';
const router=express.Router();
// ,customerHistory,
import { request,updateStatus ,addMechanic,bill,id,customerHistory,mechanicHistory,shopHistory,updateCustomerId} from '../controller/booking.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verification.js';
router.post("/request",request);
router.post("/updateStatus",verifyToken,updateStatus);
router.post("/addMechanic", verifyToken,addMechanic )
router.post("/bill",verifyToken,bill);
router.post("/customerHistory",customerHistory);
router.get("/mechanicHistory",verifyToken,mechanicHistory);
router.get("/shopHistory",verifyToken,shopHistory);
router.post("/id",id);
router.post("/updateCustomerId",updateCustomerId)
export default router;