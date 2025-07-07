// middleware/uploadTeam.js
import multer from "multer";
import path from "path";
import fs from "fs";

const teamPath = "uploads/teams";
if (!fs.existsSync(teamPath)) {
  fs.mkdirSync(teamPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, teamPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-team${ext}`);
  },
});

export const uploadTeam = multer({ storage });
