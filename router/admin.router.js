import express  from "express";

const router = express.Router();

router.post("signin",signin);
router.get("signout",signout);
router.post("forgerpassword",forgerpassword);

export default router;


