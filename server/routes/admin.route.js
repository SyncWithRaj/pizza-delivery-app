import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";
import { getAdminStats } from "../controllers/admin.controller.js"; // 👈 You'll create this next

const router = express.Router();

// 🛡️ Protect all admin routes
router.use(verifyJWT, checkRole("admin"));

// Dashboard stats route
router.get("/stats", getAdminStats);

export default router;
