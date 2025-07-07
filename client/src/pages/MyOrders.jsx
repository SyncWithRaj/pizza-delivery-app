import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch your orders");
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-gray-600">Please login to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
              <p><strong>Address:</strong> {order.deliveryAddress}</p>
              <p className="mt-2 font-medium">Pizzas:</p>
              <ul className="list-disc list-inside ml-4">
                {order.pizzas.map((pizza) => (
                  <li key={pizza._id}>
                    {pizza.customName || "Custom Pizza"} — ₹{pizza.totalPrice + 30} ({pizza.size})
                  </li>

                ))}
              </ul>
              <p className="text-sm text-gray-400 mt-2">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
