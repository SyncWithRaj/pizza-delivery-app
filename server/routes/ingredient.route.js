import express from "express";
import {
  createIngredient,
  getAllIngredients,
  deleteIngredient
} from "../controllers/ingredient.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/", getAllIngredients);

router.use(verifyJWT, checkRole("admin"));

router.post("/", upload.single("image"), createIngredient);
router.delete("/:id", deleteIngredient);

export default router;
