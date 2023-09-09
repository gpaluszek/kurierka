import express from 'express';
import { countRoutes, countCheckpoints, countEmployees } from '../controllers/CountController.js';
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();


router.get('/countRoutes', countRoutes);
router.get('/countCheckpoints', countCheckpoints);
router.get('/countEmployees', countEmployees);

export default router;
