// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB, { dbStatus } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Trust proxy (important for load balancer)
app.enable("trust proxy");

// CORS Configuration - ADD THIS BEFORE OTHER MIDDLEWARE
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://kannadakootapesu.website", // Your production domain
      "https://www.kannadakootapesu.website", // WWW version
      "https://kannada-koota-pesu.vercel.app", // Vercel preview
      /\.vercel\.app$/, // All Vercel deployments
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "X-Requested-With",
      "Accept",
      "Accept-Encoding",
      "Accept-Language",
      "Connection",
      "Host",
      "Origin",
      "Referer",
      "User-Agent",
    ],
  }),
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// HTTPS redirect for production (prevents redirect loop)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(301, `https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// Test endpoint to verify connection
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    db: dbStatus(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blogs", blogRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🎉 Kannada Koota API is running!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
