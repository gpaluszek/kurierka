import express from "express";
import {saveImageToDatabase, getImages, addImage} from "../controllers/ImageController.js";

const router = express.Router();

saveImageToDatabase

router.post('/saveImageToDatabase', addImage, saveImageToDatabase);
router.get('/getImages', getImages);


export default router;