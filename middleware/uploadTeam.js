// // middleware/uploadTeam.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// // Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("__filename: ", __filename)
// console.log("__dirname: ", __dirname)

// // Save uploads into frontend/public/teams
// const teamPath = path.join(__dirname, "../../frontend/public/teams");
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
