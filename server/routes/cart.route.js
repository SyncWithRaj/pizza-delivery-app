import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// ✅ Use verifyJWT to protect cart routes
router.use(verifyJWT);

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/clear", clearCart);
router.delete("/remove/:pizzaId", verifyJWT, removeFromCart);

export default router;
