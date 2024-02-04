import express from "express";
 
import {
    addtask,
    addTasksId,
    getTasksForEmployee,
    getTasksForProfileAndDate
} from "../controllers/WorkLogController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// WorkLogRoute.js
router.post('/add-task', addtask);
router.post('/add-tasksid', addTasksId);
router.get('/employee/:id/tasks', getTasksForEmployee);
router.get('/tasks/:profileId', getTasksForProfileAndDate);
export default router;