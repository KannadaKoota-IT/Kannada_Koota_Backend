import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

console.log("✅ authRoutes.js loaded");

router.get("/test", (req, res) => {
  res.send("✅ /api/auth/test route works");
});

router.post("/register", (req, res) => {
  console.log("📨 POST /register HIT");
  registerAdmin(req, res);
});

router.post("/login", loginAdmin);

export default router;
