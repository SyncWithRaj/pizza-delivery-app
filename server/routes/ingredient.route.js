import express from "express";
import {
  createIngredient,
  getAllIngredients,
  deleteIngredient
} from "../controllers/ingredient.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.get("/", getAllIngredients);

router.use(verifyJWT, checkRole("admin"));

router.post("/", createIngredient);
router.delete("/:id", deleteIngredient);

export default router;
