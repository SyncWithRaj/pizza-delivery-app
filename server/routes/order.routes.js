import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// 🛡️ All routes below require authentication
router.use(verifyJWT);

// 👤 User Routes
router.post("/", createOrder);      // Place new order
router.get("/my", getMyOrders);     // Get logged-in user's orders

// 🛡️ Admin Routes
router.use(checkRole("admin"));
router.get("/", getAllOrders);              // Get all orders (admin)
router.put("/:id", updateOrderStatus);      // Update status (admin)
router.delete("/:id", deleteOrder);         // Delete order (admin)

export default router;
