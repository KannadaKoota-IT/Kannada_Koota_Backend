import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import { uploadMedia, getAllMedia, updateMedia, updateGalleryOrder, deleteMedia } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getAllMedia);
router.post("/", upload.single("media"), uploadMedia);
router.put("/:id", updateMedia);
router.put("/:id/order", updateGalleryOrder);
router.delete("/:id", deleteMedia);

export default router;
