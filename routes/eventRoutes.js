// backend/routes/eventRoutes.js
import express from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadEvent } from "../middleware/uploadEvent.js";

const router = express.Router();

// Public
router.get("/", getAllEvents);

// Admin-only, protected + file upload
router.post("/", protect, uploadEvent.single("image"), createEvent);
router.put("/:id", protect, uploadEvent.single("image"), updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
