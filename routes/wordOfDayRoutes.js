// backend/routes/wordOfDayRoutes.js
import express from "express";
import {
  getAllWords,
  getTodayWord,
  createWord,
  updateWord,
  deleteWord,
} from "../controllers/wordOfDayController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllWords);
router.get("/today", getTodayWord);

// Admin-only, protected
router.post("/", protect, createWord);
router.put("/:id", protect, updateWord);
router.delete("/:id", protect, deleteWord);

export default router;
