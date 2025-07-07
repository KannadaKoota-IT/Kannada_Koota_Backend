// // middleware/uploadTeam.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const teamPath = "uploads/teams";
// if (!fs.existsSync(teamPath)) {
//   fs.mkdirSync(teamPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, teamPath);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-team${ext}`);
//   },
// });

// export const uploadTeam = multer({ storage });


// backend/middleware/uploadTeam.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kannada_koota/teams",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `${Date.now()}-team`,
  },
});

export const uploadTeam = multer({ storage });

