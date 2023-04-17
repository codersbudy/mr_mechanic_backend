import express from 'express';
import { removeCategory, saveCategory , categoryList} from '../controller/category.controller.js';

const router=express.Router();

router.post('/saveCategory',saveCategory);
router.post('/removeCategory',removeCategory);
router.get("/categoryList",categoryList);

export default router;