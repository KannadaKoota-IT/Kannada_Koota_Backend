// config/db.js
import mongoose from "mongoose";

let isDbConnected = false;

const connectDB = async () => {
  // In dev, it's common to forget env vars. Don't crash the whole server
  // just because MongoDB is not configured yet.
  if (!process.env.MONGO_URI) {
    console.warn(
      "⚠️ Missing `MONGO_URI` in backend `.env`. Starting server without DB connection."
    );
    isDbConnected = false;
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Kept for compatibility with older Mongoose versions.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isDbConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    isDbConnected = false;
    console.error("MongoDB connection error:", err.message);

    // Allow running the server (e.g., to debug routes/health) unless explicitly required.
    if (process.env.REQUIRE_MONGO === "true") process.exit(1);
  }
};

export const dbStatus = () => ({
  connected: isDbConnected,
});

export default connectDB;
