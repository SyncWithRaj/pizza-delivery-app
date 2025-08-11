// models/order.model.js
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzas: [
      {
        pizza: {
          type: Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },
        customName: String,
        size: String,
        ingredients: [
          {
            name: String,
            price: Number,
          },
        ],
        totalPrice: Number, // calculated dynamically
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["order-received", "in-kitchen", "out-for-delivery", "delivered"],
      default: "order-received",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: String,
    deliveryAddress: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
