import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Pizza } from "../models/pizza.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAdminStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalPizzas = await Pizza.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: { $ne: "delivered" } });

  const totalRevenueAgg = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    {
      $lookup: {
        from: "pizzas",
        localField: "pizzas",
        foreignField: "_id",
        as: "pizzaDetails"
      }
    },
    { $unwind: "$pizzaDetails" },
    {
      $group: {
        _id: null,
        total: { $sum: "$pizzaDetails.totalPrice" }
      }
    }
  ]);

  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  res.status(200).json(new ApiResponse(200, {
    totalOrders,
    totalUsers,
    totalPizzas,
    pendingOrders,
    totalRevenue
  }));
});
