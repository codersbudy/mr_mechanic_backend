import express from 'express';
import { save, remove, getList, id, update, updateStatus } from '../controller/shop.controller.js';
//  import { verifyToken } from '../middleware/verification.js';
const router=express.Router();

router.post("/save",save);
router.post("/remove",remove);
router.get("/getList",getList);
router.get("/id/:shopId",id);
router.post("/update",update);
router.post("/updateStatus",updateStatus)

export default router;