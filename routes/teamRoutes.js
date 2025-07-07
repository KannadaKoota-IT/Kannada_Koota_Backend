// backend/routes/teamRoutes.js
import express from "express";
import {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadTeam } from "../middleware/uploadTeam.js";

const router = express.Router();

router.get("/", getAllTeamMembers);
router.post("/", protect, uploadTeam.single("photo"), addTeamMember);
router.put("/:id", protect, uploadTeam.single("photo"), updateTeamMember);
router.delete("/:id", protect, deleteTeamMember);

export default router;
