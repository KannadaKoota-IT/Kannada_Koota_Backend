import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "kannada_koota",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

export default upload;
