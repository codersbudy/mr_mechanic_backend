import express  from "express";

import {ratinglist,ratingsave} from "../controller/customerRating.controller.js";
import { verifyToken } from "../middleware/verification.js";


const router = express.Router();

router.post("/Ratingsave",verifyToken,ratingsave);
router.post("/Ratinglist",verifyToken,ratinglist);
 
export default router;