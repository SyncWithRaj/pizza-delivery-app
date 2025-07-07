import Razorpay from "razorpay";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Generate Razorpay Order
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body; // Amount in rupees

  const options = {
    amount: amount * 100, // Razorpay needs paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json(new ApiResponse(200, { orderId: order.id }, "Order created"));
});

// ✅ Verify payment (called from frontend after success)
export const verifyRazorpaySignature = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid signature");
  }

  // ✅ Payment is verified — update DB order
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  order.paymentStatus = "paid";
  order.paymentId = razorpay_payment_id;
  await order.save();

  res.status(200).json(new ApiResponse(200, order, "Payment verified successfully"));
});
