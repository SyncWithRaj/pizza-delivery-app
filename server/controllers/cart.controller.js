import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "pizzas.pizza",
    populate: { path: "ingredients" },
  });

  if (!cart) {
    return res
      .status(200)
      .json(new ApiResponse(200, { pizzas: [] }, "Cart is empty"));
  }

  const cartItems = cart.pizzas
    .map((item) => {
      if (!item.pizza) return null; // pizza was deleted from DB
      return {
        ...item.pizza.toObject(),
        quantity: item.quantity,
      };
    })
    .filter(Boolean); // remove nulls from list

  res
    .status(200)
    .json(new ApiResponse(200, { pizzas: cartItems }, "Cart fetched successfully"));
});

// ✅ Add/Update Item to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { pizzaId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      pizzas: [{ pizza: pizzaId, quantity }],
    });
  } else {
    const existingItem = cart.pizzas.find(
      (item) => item.pizza.toString() === pizzaId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.pizzas.push({ pizza: pizzaId, quantity });
    }

    await cart.save();
  }

  res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});


// ✅ Remove Item from Cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const { pizzaId } = req.params; // ✅ FIXED

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.pizzas = cart.pizzas.filter((item) => item.pizza.toString() !== pizzaId);
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});


// ✅ Clear Cart (after order placed)
export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(200).json(new ApiResponse(200, null, "Cart cleared"));
});
