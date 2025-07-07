// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

// config/db.js
// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI;
//     console.log("🔍 MONGO_URI from env:", mongoURI); // Debugging

//     if (!mongoURI) {
//       throw new Error("❌ MONGO_URI not found in environment variables");
//     }

//     const conn = await mongoose.connect(mongoURI);

//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

