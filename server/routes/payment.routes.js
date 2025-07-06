import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpaySignature
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/order", createRazorpayOrder);
router.post("/verify", verifyRazorpaySignature);

export default router;
