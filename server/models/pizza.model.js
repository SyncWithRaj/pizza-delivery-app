import mongoose, { Schema } from "mongoose";

const pizzaSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    customName: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Pizza = mongoose.model("Pizza", pizzaSchema);
