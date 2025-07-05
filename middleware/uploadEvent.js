// middleware/uploadEvent.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Create folder
const eventPath = "uploads/events";
if (!fs.existsSync(eventPath)) {
  fs.mkdirSync(eventPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, eventPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-event${ext}`);
  },
});

export const uploadEvent = multer({ storage });
