import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
} from "../controllers/razorpay.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// 👤 Authenticated routes only
router.use(verifyJWT);

// 🧾 Create a new Razorpay order
router.post("/create-order", createRazorpayOrder);

// ✅ Verify Razorpay signature
router.post("/verify", verifyRazorpaySignature);

export default router;
