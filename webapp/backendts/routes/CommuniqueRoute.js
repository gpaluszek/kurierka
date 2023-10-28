import express from "express";
import {
    getAllCommuniques,
    getCommuniqueById,
    createCommunique,
    updateCommunique,
    deleteCommunique
} from "../controllers/CommuniqueControler.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/communiques', getAllCommuniques);
router.get('/communiques/:id', getCommuniqueById);
router.post('/communiques',  createCommunique);
router.put('/communiques/:id',  updateCommunique);
router.delete('/communiques/:id',  deleteCommunique);

export default router;
