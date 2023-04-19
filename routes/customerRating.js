import express  from "express";
import { verifyToken } from "../middleware/varification.js";
import {ratinglist,ratingsave} from "../controller/customerRating.controller.js";

const router = express.Router();

router.post("/Ratingsave",verifyToken,ratingsave);
router.post("/Ratinglist",verifyToken,ratinglist);
 
export default router;