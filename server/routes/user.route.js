// in routes/user.route.js
import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/", verifyJWT, checkRole("admin"), getAllUsers);

export default router; // <-- export default
