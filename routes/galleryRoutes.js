import express from "express";
import multer from "multer";
import { uploadMedia, getAllMedia, deleteMedia } from "../controllers/galleryController.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/gallery/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getAllMedia);
router.post("/", upload.single("media"), uploadMedia);
router.delete("/:id", deleteMedia);

export default router;
