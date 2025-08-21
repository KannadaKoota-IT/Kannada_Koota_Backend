// backend/routes/eventRoutes.js
import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

// Public
router.get("/", getAllEvents);

// Admin-only, protected + file upload
router.post("/", protect, upload.single("image"), createEvent);
router.put("/:id", protect, upload.single("image"), updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
