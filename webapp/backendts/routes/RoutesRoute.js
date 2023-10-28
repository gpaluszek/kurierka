import express from "express";
import {

    connectProfileToTrail,
    addCheckpoint,
    addCategory,
    deleteCategory, // Dodana ścieżka do usuwania kategorii
    getAllCategories,
    addTrail,
    getTrails,
    getPointsCountForRoute,
    addCheckpointToTrail,
    deleteTrail,
    getAllPoints,
    getAvailableCheckpoints,
    getExistingCheckpoints,
    removeCheckpointFromTrail
} from "../controllers/RouteController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/connectProfileToTrail', connectProfileToTrail);
router.post('/addCategory', addCategory);
router.delete('/deleteCategory/:id', deleteCategory); // Nowa ścieżka do usuwania kategorii
router.post('/addCheckpoint', addCheckpoint);
router.get('/getAllCategories', getAllCategories);
router.post('/addTrail', addTrail);
router.get('/trails', getTrails);
router.get('/trails/:id/pointsCount', getPointsCountForRoute);
router.post('/addCheckpointToTrail', addCheckpointToTrail);
router.delete('/deleteTrail/:id', deleteTrail);
router.get('/getAllPoints', getAllPoints);
router.get('/getAvailableCheckpoints/:id', getAvailableCheckpoints);
router.get('/getExistingCheckpoints/:trailId', getExistingCheckpoints);
router.delete('/removeCheckpointFromTrail/:trailId', removeCheckpointFromTrail);


  export default router;



