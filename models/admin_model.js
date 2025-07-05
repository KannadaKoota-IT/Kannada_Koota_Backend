// server/models/admin_model.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
});

export default mongoose.model("Admin", adminSchema);
