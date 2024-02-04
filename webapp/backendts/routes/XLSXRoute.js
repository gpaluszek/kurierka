import express from "express";
import { addDataToDatabaseXLSX,
} from "../controllers/XLSXController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();


router.post('/addDataToDatabaseXLSX/', addDataToDatabaseXLSX);



  export default router;



