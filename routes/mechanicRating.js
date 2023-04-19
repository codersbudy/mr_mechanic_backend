import express  from "express";

import { verifyToken } from "../middleware/varification.js";
import { ratinglist,ratingsave } from "../controller/mechanicRating.controller.js";

const router = express.Router();

router.post("ratingsave",verifyToken,ratingsave);
router.post("ratinglist",verifyToken,ratinglist);
 
export default router;
