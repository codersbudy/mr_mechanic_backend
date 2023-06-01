import express from 'express';
import { save, remove, getList, id, update, updateStatus,nearByShop } from '../controller/shop.controller.js';
import { verifyToken } from '../middleware/verification.js';
import { body } from 'express-validator';
const router=express.Router();

router.post("/save",
body("shopName","please enter shopName").notEmpty(),
body("photo").notEmpty(),
body("licenceNo").notEmpty(),
body("licencePhoto").notEmpty(),
body("address").notEmpty(),
body("latLong").notEmpty(),
verifyToken,save);
router.post("/remove",verifyToken,remove);
router.get("/getList",getList);
router.get("/id/:shopId",verifyToken,id);
router.post("/update",verifyToken,update);
router.post("/updateStatus",updateStatus)
router.post("/nearByShop",nearByShop);

export default router;