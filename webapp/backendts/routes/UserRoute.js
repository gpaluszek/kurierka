import express from "express";
 
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
    getActiveUsers
} from "../controllers/UserController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly,  getUsers);
router.get('/users/:id',  getUserById);
router.post('/users',  createUser);
router.patch('/users/:id',  updateUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/status/:id', updateUserStatus );
router.get('/active-users', getActiveUsers);

export default router;