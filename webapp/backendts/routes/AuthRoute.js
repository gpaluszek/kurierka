import express from "express";
import {Login, logOut, Me, changePassword,getUserContracts} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.post('/changePassword', changePassword);
router.get('/mecontracts', getUserContracts);
export default router;