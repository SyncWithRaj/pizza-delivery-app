import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaRupeeSign, FaClock, FaCheckCircle, FaMapMarkerAlt, FaPizzaSlice } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data.data || []);
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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600 flex items-center justify-center gap-2">
        <FaPizzaSlice className="text-red-500" /> My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              {/* Header */}
              <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <div className="flex gap-2 items-center flex-wrap">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 ${
                      order.status === "placed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <FaClock /> {order.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1 ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <FaCheckCircle /> {order.paymentStatus}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <FaClock />
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Address */}
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-medium">Address:</span> {order.deliveryAddress}
              </p>

              {/* Pizza List */}
              <div>
                <p className="font-semibold mb-2 text-gray-800 text-lg flex items-center gap-2">
                  <FaPizzaSlice className="text-yellow-500" /> Pizzas Ordered:
                </p>
                <ul className="space-y-2 pl-4 text-sm text-gray-700">
                  {order.pizzas.map((pizza) => (
                    <li
                      key={pizza._id}
                      className="flex justify-between items-center border-b py-1"
                    >
                      <span>
                        {pizza.customName || "Custom Pizza"} ({pizza.size})
                        {pizza.quantity > 1 && (
                          <span className="ml-1 text-xs text-gray-500">
                            × {pizza.quantity}
                          </span>
                        )}
                      </span>
                      <span className="text-green-700 font-medium flex items-center gap-1">
                        <FaRupeeSign /> {pizza.totalPrice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
