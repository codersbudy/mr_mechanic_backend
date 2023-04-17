import express from 'express';
import { removeCategory, saveCategory , categoryList} from '../controller/category.controller.js';
import { verifyToken } from '../middleware/verification.js';

const router=express.Router();
<<<<<<< HEAD

router.post('/saveCategory',verifyToken,saveCategory);
router.post('/removeCategory',verifyToken,removeCategory);
=======
router.post('/saveCategory',saveCategory);
router.post('/saveCategory',saveCategory);
router.post('/removeCategory',removeCategory);
>>>>>>> 7574a0d0f310d6bdcabefd82767227fbe3ed582f
router.get("/categoryList",categoryList);

export default router;