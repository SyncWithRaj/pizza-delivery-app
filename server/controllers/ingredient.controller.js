import { Ingredient } from "../models/ingredient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Create Ingredient (admin only)
export const createIngredient = asyncHandler(async (req, res) => {
  const { name, price, type } = req.body;

  if (!name || !price) {
    throw new ApiError(400, "Name and price are required");
  }

  const existing = await Ingredient.findOne({ name });
  if (existing) throw new ApiError(409, "Ingredient already exists");

  const ingredient = await Ingredient.create({ name, price, type });
  res.status(201).json(new ApiResponse(201, ingredient, "Ingredient created"));
});

// Get All Ingredients (public)
export const getAllIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find();
  res.status(200).json(new ApiResponse(200, ingredients));
});

// Delete Ingredient (admin)
export const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
  if (!ingredient) throw new ApiError(404, "Ingredient not found");
  res.status(200).json(new ApiResponse(200, null, "Ingredient deleted"));
});
