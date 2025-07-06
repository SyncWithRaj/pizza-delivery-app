import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pizzas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pizza",
      }
    ],
    status: {
      type: String,
      enum: ["received", "in-kitchen", "out-for-delivery", "delivered"],
      default: "received",
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
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
