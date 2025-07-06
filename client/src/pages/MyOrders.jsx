import { useEffect, useState } from "react";
import API from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data.data);
      } catch {
        alert("Failed to fetch orders");
      }
    };
    getOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded">
            <p>Status: {order.status}</p>
            <p>Payment: {order.paymentStatus}</p>
            <p>Address: {order.deliveryAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
