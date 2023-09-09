import express from "express";
import {
    createContractGlobal,
    deleteContract
} from "../controllers/ContractController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();


router.post('/employee/:employeeId/contracts', createContractGlobal);


router.delete('/employee/:employeeId/contracts/:contractId', deleteContract);

export default router;