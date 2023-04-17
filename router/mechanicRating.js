import express  from "express";

const router = express.Router();

router.post("save",save);
router.post("list",list);
 
export default router;