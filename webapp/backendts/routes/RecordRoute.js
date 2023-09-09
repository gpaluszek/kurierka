import express from "express";
import {
    createRecord,
    getRecordsByUserId
} from "../controllers/RecordControler.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/createRecord', createRecord);
router.get('/user/:userId/records', getRecordsByUserId);

export default router;
