import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Create a new order (user)
export const createOrder = asyncHandler(async (req, res) => {
  const { pizzas, deliveryAddress } = req.body;

  if (!pizzas || !Array.isArray(pizzas) || pizzas.length === 0) {
    throw new ApiError(400, "At least one pizza is required");
  }

  if (!deliveryAddress) {
    throw new ApiError(400, "Delivery address is required");
  }

  const order = await Order.create({
    user: req.user._id,
    pizzas,
    deliveryAddress,
  });

  res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});

// ✅ Get all orders (admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "username email").populate("pizzas");
  res.status(200).json(new ApiResponse(200, orders, "All orders"));
});

// ✅ Get my orders (user)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("pizzas");
  res.status(200).json(new ApiResponse(200, orders, "Your orders"));
});

// ✅ Update order status (admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, paymentId } = req.body;

  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (paymentId) order.paymentId = paymentId;

  await order.save();

  res.status(200).json(new ApiResponse(200, order, "Order updated"));
});

// ✅ Delete order (admin only - optional)
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, null, "Order deleted"));
});
