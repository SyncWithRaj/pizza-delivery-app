import { useEffect, useState } from "react";
import API from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders"); // Admin route
      setOrders(res.data.data);
    } catch {
      alert("Failed to fetch orders");
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
    } catch {
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await API.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Failed to delete order");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 All Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded mb-4">
            <p><b>User:</b> {order.user?.username} ({order.user?.email})</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Payment:</b> {order.paymentStatus}</p>
            <p><b>Address:</b> {order.deliveryAddress}</p>
            <p><b>Total Price:</b> ₹{order.totalPrice + 30}</p>
            <p><b>Pizzas:</b></p>
            <ul className="list-disc list-inside ml-4">
              {order.pizzas.map((p) => (
                <li key={p._id}>
                  {p.customName || "Custom Pizza"} - ₹{p.totalPrice}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-3">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border p-1 rounded"
              >
                {["received", "in-kitchen", "out-for-delivery", "delivered"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                onClick={() => deleteOrder(order._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
