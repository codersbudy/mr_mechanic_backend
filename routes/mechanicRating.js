import express  from "express";


import { ratinglist,ratingsave } from "../controller/mechanicRating.controller.js";
import { verifyToken } from "../middleware/verification.js";

const router = express.Router();

router.post("ratingsave",verifyToken,ratingsave);
router.post("ratinglist",verifyToken,ratinglist);
 
export default router;
