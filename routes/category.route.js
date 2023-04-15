import express from 'express';
const router=express.Router();
import { saveCategory } from '../controller/category.controller,js';
router.post('/saveCategory',saveCategory);


export default router;