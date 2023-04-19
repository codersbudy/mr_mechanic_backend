import express from 'express';
const router=express.Router();
// ,customerHistory,
import { request,updateStatus ,addMechanic,bill,id,customerHistory,mechanicHistory,shopHistory} from '../controller/booking.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verification.js';
router.post("/request",request);
router.post("/updateStatus",verifyToken,updateStatus);
router.post("/addMechanic", verifyToken,addMechanic )
router.post("/bill",verifyToken,bill);
router.get("/customerHistory",verifyToken,customerHistory);
router.get("/mechanicHistory",verifyToken,mechanicHistory);
router.get("/shopHistory",shopHistory);
router.post("/id",verifyToken,id);
export default router;