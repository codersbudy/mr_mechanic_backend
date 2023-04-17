import express from 'express';
import { save, remove, getList, id, update, updateStatus } from '../controller/shop.controller.js';
import { verifyToken } from '../middleware/verification.js';
const router=express.Router();

router.post("/save",verifyToken,save);
router.post("/remove",verifyToken,remove);
router.get("/getList",verifyToken,getList);
router.get("/id/:shopId",verifyToken,id);
router.post("/update",verifyToken,update);
router.post("/updateStatus",verifyToken,updateStatus)

export default router;