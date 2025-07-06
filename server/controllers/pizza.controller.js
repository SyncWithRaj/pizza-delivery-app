import { Pizza } from "../models/pizza.model.js";
import { Ingredient } from "../models/ingredient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createPizza = asyncHandler(async (req, res) => {
  const { ingredients, size = "medium", customName } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    throw new ApiError(400, "At least one ingredient is required");
  }

  // ✅ Fetch all ingredients from DB
  const ingredientDocs = await Ingredient.find({ _id: { $in: ingredients } });

  if (ingredientDocs.length !== ingredients.length) {
    throw new ApiError(400, "Some ingredients are invalid");
  }

  // ✅ Step 1: Base price based on size
  const basePriceMap = {
    small: 30,
    medium: 40,
    large: 50,
  };

  const basePrice = basePriceMap[size];
  if (!basePrice) throw new ApiError(400, "Invalid size");

  // ✅ Step 2: Filter and sum ingredient prices by type
  let extraIngredientsPrice = 0;

  ingredientDocs.forEach((ing) => {
    if (ing.type !== "base") {
      extraIngredientsPrice += ing.price;
    }
    // base type is already covered by size-based basePrice
  });

  const totalPrice = basePrice + extraIngredientsPrice;

  // ✅ Create the pizza
  const pizza = await Pizza.create({
    user: req.user._id,
    ingredients,
    size,
    customName,
    totalPrice,
  });

  res.status(201).json(new ApiResponse(201, pizza, "Pizza created successfully"));
});



export const getAllPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find().populate("user", "username").populate("ingredients", "name");
  res.status(200).json(new ApiResponse(200, pizzas));
});

export const getMyPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({ user: req.user._id }).populate("ingredients", "name");
  res.status(200).json(new ApiResponse(200, pizzas));
});

export const getPizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id).populate("ingredients", "name");

  if (!pizza) throw new ApiError(404, "Pizza not found");

  res.status(200).json(new ApiResponse(200, pizza));
});

export const updatePizza = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!pizza) throw new ApiError(404, "Pizza not found");

  res.status(200).json(new ApiResponse(200, pizza, "Pizza updated"));
});

export const deletePizza = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findByIdAndDelete(req.params.id);

  if (!pizza) throw new ApiError(404, "Pizza not found");

  res.status(200).json(new ApiResponse(200, null, "Pizza deleted"));
});
