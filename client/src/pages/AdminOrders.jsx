import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaUserAlt,
  FaMoneyBill,
  FaMapMarkedAlt,
  FaPizzaSlice,
  FaClock,
} from "react-icons/fa";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.data);
    } catch {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await API.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="p-16 max-w-full mx-auto min-h-[90vh] bg-[#fff8f0]">
      <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
        <FaClock /> All Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
            >
              {/* User Info + Date */}
              <div className="flex flex-wrap justify-between items-center mb-3">
                <div className="text-gray-800 font-semibold flex items-center gap-2">
                  <FaUserAlt className="text-blue-600" />
                  {order.user?.username} ({order.user?.email})
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  Status: {order.status}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Payment: {order.paymentStatus}
                </span>
              </div>

              {/* Address */}
              <p className="mb-3 text-gray-700 flex gap-2 items-center">
                <FaMapMarkedAlt className="text-gray-500" />
                <span className="font-semibold">Address:</span>{" "}
                {order.deliveryAddress}
              </p>

              {/* Pizza List */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                  <FaPizzaSlice /> Pizzas Ordered:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {order.pizzas.map((p) => (
                    <li
                      key={p._id}
                      className="flex justify-between border-b py-1"
                    >
                      <span>
                        {p.customName || "Custom Pizza"} ({p.size})
                      </span>
                      <span className="text-green-700 font-medium">
                        ₹{p.totalPrice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total Price */}
              <p className="text-sm text-gray-800 font-medium flex items-center gap-2 mb-4">
                <FaMoneyBill className="text-green-600" />
                Total: ₹{order.totalPrice + 30}
              </p>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {["received", "in-kitchen", "out-for-delivery", "delivered"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition font-semibold"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
