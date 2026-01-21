import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  addReview,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, upload.single("image"), createBlog);
router.post("/:id/review", addReview);
router.delete("/:id", protect, deleteBlog);

export default router;
