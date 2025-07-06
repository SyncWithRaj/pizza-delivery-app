import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.config.js";
import { app } from "./app.js";

// 📍 Fix for ESM __dirname (mandatory for dotenv path)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env using absolute path
dotenv.config({ path: path.resolve(__dirname, ".env") });

// 🔍 Debug logs (optional)
console.log("🧪 MONGODB_URI:", process.env.MONGODB_URI);
console.log("🧪 PORT:", process.env.PORT);
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err);
  });
