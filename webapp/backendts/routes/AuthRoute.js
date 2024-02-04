// Importuj funkcję middleware
import express from "express";
import jwt from "jsonwebtoken";  // Dodaj import biblioteki jsonwebtoken


import { Login, logOut, Me, changePassword, getUserContracts,CheckSession, getTasksForToday } from "../controllers/Auth.js";

const router = express.Router();

// Dodaj middleware do chronionych tras
router.get('/me', Me);
// Pozostałe trasy...
router.post('/login', Login);
router.delete('/logout', logOut);
router.post('/changePassword', changePassword);
router.get('/mecontracts', getUserContracts);
router.get('/getTasksForToday', getTasksForToday);
router.get('/CheckSession', CheckSession);

export default router;
