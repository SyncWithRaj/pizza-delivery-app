import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🍕 Welcome to the Pizza Delivery API!");
});

export { app };
