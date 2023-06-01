import express from 'express';

import { save, signIn, getList, id, remove, updateStatus, signout, bulkSave } from '../controller/mechanic.controller.js'
import { verifyToken } from '../middleware/verification.js';


const router = express.Router();

router.post("/save", verifyToken, save);
router.post("/signIn", signIn)
router.get("/getList", getList);
router.get("/id/:mechanicId", verifyToken, id);
router.get("/remove/:mechanicId", verifyToken, remove);
router.get("/updateStatus", verifyToken, updateStatus);
router.get("/signout", verifyToken, signout);
router.post("/bulkSave", bulkSave);

export default router;