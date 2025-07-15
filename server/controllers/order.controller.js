import { Order } from "../models/order.model.js";
import { Pizza } from "../models/pizza.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { pizzas, deliveryAddress } = req.body;

  if (!Array.isArray(pizzas) || pizzas.length === 0) {
    throw new ApiError(400, "At least one pizza is required");
  }

  if (!deliveryAddress?.trim()) {
    throw new ApiError(400, "Delivery address is required");
  }

  // ✅ Extract pizza IDs from Cart payload
  const pizzaIds = pizzas.map((p) => p.pizza);

  // ✅ Fetch pizza docs and populate ingredients
  const pizzaDocs = await Pizza.find({ _id: { $in: pizzaIds } }).populate("ingredients");

  if (pizzaDocs.length !== pizzaIds.length) {
    throw new ApiError(404, "One or more pizzas not found");
  }

  const sizePriceMap = { small: 30, medium: 40, large: 50 };

  // ✅ Build Order Pizza Array with dynamic price
  const orderPizzas = pizzas.map((item) => {
    const matchedPizza = pizzaDocs.find(
      (doc) => doc._id.toString() === item.pizza
    );

    if (!matchedPizza) {
      throw new ApiError(400, "Invalid pizza reference");
    }

    const ingredients = matchedPizza.ingredients.map((ing) => ({
      name: ing.name,
      price: ing.price,
    }));

    const sizePrice = sizePriceMap[matchedPizza.size] || 0;
    const ingredientsTotal = ingredients.reduce((acc, ing) => acc + (ing.price || 0), 0);
    const onePizzaPrice = sizePrice + ingredientsTotal;

    return {
      pizza: matchedPizza._id,
      customName: matchedPizza.customName || "Custom Pizza",
      size: matchedPizza.size,
      ingredients,
      totalPrice: onePizzaPrice,
      quantity: item.quantity || 1,
    };
  });

  // ✅ Calculate order total
  const totalPrice = orderPizzas.reduce(
    (sum, p) => sum + p.totalPrice * p.quantity,
    0
  );

  // ✅ Create Order
  const order = await Order.create({
    user: req.user._id,
    pizzas: orderPizzas,
    deliveryAddress,
    totalPrice,
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});


// ✅ Get orders of logged-in user (USER)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json(new ApiResponse(200, orders, "Your orders"));
});

// ✅ Get all orders (ADMIN only)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, orders, "All orders"));
});

// ✅ Update order status (ADMIN only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, paymentId } = req.body;

  const validStatuses = [
    "received",
    "in-kitchen",
    "out-for-delivery",
    "delivered",
  ];

  if (status && !validStatuses.includes(status)) {
    throw new ApiError(400, `Invalid status: ${status}`);
  }

  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (paymentId) order.paymentId = paymentId;

  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

// ✅ Delete an order (ADMIN only)
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Order deleted successfully"));
});
