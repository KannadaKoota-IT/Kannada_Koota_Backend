// routes/teamRoutes.js
import express from "express";
import {
  addTeam,
  addTeamMember,
  getAllTeams,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { uploadTeam } from "../middleware/uploadTeam.js";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

router.get("/", getAllTeams);
router.post("/", protect, upload.single("photo"), addTeam);
router.post("/:teamId/members", protect,upload.single("photo"), addTeamMember);
router.get("/:teamId/members", getTeamMembers);
router.put("/members/:memberId", protect, upload.single("photo"), updateTeamMember);
router.delete("/members/:memberId", protect, deleteTeamMember);

export default router;
