import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import { uploadMedia, getAllMedia, deleteMedia } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getAllMedia);
router.post("/", upload.single("media"), uploadMedia); 
router.delete("/:id", deleteMedia);

export default router;
