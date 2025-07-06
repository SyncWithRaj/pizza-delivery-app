import mongoose, { Schema } from "mongoose";

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["base", "sauce", "cheese", "veggie"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
