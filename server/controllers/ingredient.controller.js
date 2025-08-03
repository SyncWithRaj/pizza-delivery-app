import { Ingredient } from "../models/ingredient.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

// ✅ Create Ingredient with optional image (admin only)
export const createIngredient = asyncHandler(async (req, res) => {
  const { name, price, type, stock, image } = req.body;

  if (!name || !price || !type || !image) {
    throw new ApiError(400, "All fields including image are required");
  }

  const existing = await Ingredient.findOne({ name });
  if (existing) throw new ApiError(409, "Ingredient already exists");

  const ingredient = await Ingredient.create({
    name,
    price,
    type,
    stock,
    image,
  });

  res
    .status(201)
    .json(new ApiResponse(201, ingredient, "Ingredient created with image"));
});

// ✅ Get All Ingredients (public)
export const getAllIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find();
  res.status(200).json(new ApiResponse(200, ingredients));
});

// ✅ Delete Ingredient (admin)
export const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
  if (!ingredient) throw new ApiError(404, "Ingredient not found");
  res.status(200).json(new ApiResponse(200, null, "Ingredient deleted"));
});

// ✅ Update stock of an ingredient (admin)
export const updateIngredientStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    throw new ApiError(400, "Invalid quantity");
  }

  const ingredient = await Ingredient.findById(id);
  if (!ingredient) throw new ApiError(404, "Ingredient not found");

  ingredient.stock += quantity;
  await ingredient.save();

  res.status(200).json(new ApiResponse(200, ingredient, "Stock updated"));
});
