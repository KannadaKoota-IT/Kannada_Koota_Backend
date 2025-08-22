import express from "express";
import {
  getAllAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import upload from "../middleware/cloudinaryUpload.js"

const router = express.Router();

// Base route: /api/announcements

router.get("/", getAllAnnouncements);       // GET all announcements
router.post("/", upload.single("media"), addAnnouncement);          // POST a new announcement
router.put("/:id", upload.single("media"), updateAnnouncement);     // UPDATE by ID
router.delete("/:id", deleteAnnouncement);  // DELETE by ID

export default router;
