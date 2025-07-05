import express from "express";
import {
  getAllAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

// Base route: /api/announcements

router.get("/", getAllAnnouncements);       // GET all announcements
router.post("/", addAnnouncement);          // POST a new announcement
router.put("/:id", updateAnnouncement);     // UPDATE by ID
router.delete("/:id", deleteAnnouncement);  // DELETE by ID

export default router;
