import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import { uploadMedia, getAllMedia, updateMedia, deleteMedia } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getAllMedia);
router.post("/", upload.single("media"), uploadMedia);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;
