import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  forgotPasswordController,
  resetPassword
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPasswordController);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/reset-password/:token", resetPassword);

export default router;
