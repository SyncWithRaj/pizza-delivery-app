// in routes/user.route.js
import express from "express";
import { deleteUser, getAllUsers, verifyOtpAndUpdate } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";
import { sendOtp } from "../controllers/sendOtp.controller.js";

const router = express.Router();

router.get("/", verifyJWT, checkRole("admin"), getAllUsers);
router.post("/send-otp", verifyJWT, sendOtp)
router.put("/update", verifyJWT, verifyOtpAndUpdate);
// ✅ For deleting own account
router.delete("/:id", verifyJWT, deleteUser);

export default router;
