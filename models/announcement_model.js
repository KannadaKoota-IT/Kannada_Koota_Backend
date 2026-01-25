import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_k: {type: String, required: true },
  message: { type: String, required: true },
  message_k: { type: String, required: true },
  link: { type: String },
  mediaUrl: { type: String },
  mediaType: { type: String },
  mediaPublicId: {type: String},
  date: { type: Date, default: Date.now, required: true },
});

export default mongoose.model("Announcement", announcementSchema);
