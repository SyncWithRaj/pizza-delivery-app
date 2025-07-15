import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Pizza } from "../models/pizza.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAdminStats = asyncHandler(async (req, res) => {
  const [totalOrders, totalUsers, totalPizzas, pendingOrders, paidOrders] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments(),
    Pizza.countDocuments(),
    Order.countDocuments({ status: { $ne: "delivered" } }),
    Order.find({ paymentStatus: "paid" }),
  ]);

  const totalRevenue = paidOrders.reduce((sum, order) => {
    return (
      sum +
      order.pizzas.reduce((innerSum, p) => {
        return innerSum + (p.totalPrice || 0) * (p.quantity || 1);
      }, 0)
    );
  }, 0);

  res.status(200).json(
    new ApiResponse(200, {
      totalOrders,
      totalUsers,
      totalPizzas,
      pendingOrders,
      totalRevenue,
    }, "Admin stats fetched successfully")
  );
});
