import express from "express";
import {
  createPizza,
  getAllPizzas,
  getMyPizzas,
  getPizzaById,
  updatePizza,
  deletePizza
} from "../controllers/pizza.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/my", getMyPizzas);
router.post("/", checkRole("user", "admin"), createPizza);
router.get("/", checkRole("admin"), getAllPizzas);
router.get("/:id", getPizzaById);
router.put("/:id", checkRole("admin"), updatePizza);
router.delete("/:id", checkRole("admin"), deletePizza);

export default router;
