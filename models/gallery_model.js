import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], required: true },
  desc: { type: String, required: true },
  publicId: { type: String, required: true },
  link: { type: String, default: "" },
  order: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Gallery", gallerySchema);
