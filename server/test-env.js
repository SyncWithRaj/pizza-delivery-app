import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// This is ESM-friendly __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file using absolute path
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("✅ MONGODB_URI =", process.env.MONGODB_URI);
