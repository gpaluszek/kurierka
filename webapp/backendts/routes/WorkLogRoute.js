import express from "express";
 
import {
    addtask,
    addTaskId,
    getTasksForEmployee,
    getTasksForProfileAndDate
} from "../controllers/WorkLogController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// WorkLogRoute.js
router.post('/add-task', addtask);
router.post('/add-taskid', addTaskId);
router.get('/employee/:id/tasks', getTasksForEmployee);
router.get('/tasks/:profileId', getTasksForProfileAndDate);
export default router;