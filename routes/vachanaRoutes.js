// backend/routes/vachanaRoutes.js
import express from "express";
import {
  getAllVachanas,
  getTodayVachana,
  createVachana,
  updateVachana,
  deleteVachana,
} from "../controllers/vachanaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllVachanas);
router.get("/today", getTodayVachana);

// Admin-only, protected
router.post("/", protect, createVachana);
router.put("/:id", protect, updateVachana);
router.delete("/:id", protect, deleteVachana);

export default router;
