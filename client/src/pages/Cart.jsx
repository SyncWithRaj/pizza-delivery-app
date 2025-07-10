import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaPizzaSlice,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaShoppingCart,
} from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data?.data?.pizzas || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, pizza) => sum + pizza.totalPrice * (pizza.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    try {
      const orderRes = await API.post("/orders", {
        pizzas: cartItems.map((p) => p._id),
        deliveryAddress: address,
      });

      const order = orderRes.data?.data;

      const razorRes = await API.post("/razorpay/create-order", {
        amount: totalPrice,
      });

      const { orderId } = razorRes.data?.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Pizza Delivery",
        description: "Cart Checkout",
        order_id: orderId,
        handler: async function (response) {
          try {
            await API.post("/razorpay/verify", {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });

            await API.delete("/cart/clear");
            toast.success("Payment Successful! Order placed successfully.");
            navigate("/my-orders");
          } catch (err) {
            console.error("Payment verification failed", err);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Raj",
          email: "raj@example.com",
        },
        theme: { color: "#0f766e" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-red-600 text-center flex items-center justify-center gap-2">
        <FaShoppingCart className="text-red-500" />
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">🧺 Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-6">
            {cartItems.map((pizza, i) => (
              <li
                key={i}
                className="border rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaPizzaSlice className="text-yellow-500" />
                    {pizza.customName || "Custom Pizza"}
                  </h3>
                  <span className="text-sm text-gray-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                    Size: {pizza.size}
                  </span>
                </div>

                <ul className="text-sm text-gray-700 mb-3">
                  {pizza.ingredients?.map((ing) => (
                    <li key={ing._id} className="flex justify-between">
                      <span>{ing.name}</span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <FaRupeeSign /> {ing.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center font-medium text-gray-800 mt-2">
                  <span>Quantity: {pizza.quantity || 1}</span>
                  <span>
                    ₹{pizza.totalPrice} × {pizza.quantity || 1} ={" "}
                    <span className="text-green-700 font-bold">
                      ₹{pizza.totalPrice * (pizza.quantity || 1)}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Address Field */}
          <div className="mb-6">
            <label className="mb-1 font-medium text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Delivery Address
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Total + Checkout */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 sm:mb-0 flex items-center gap-2">
              Total Payable:{" "}
              <span className="text-green-700 flex items-center">
                <FaRupeeSign /> {totalPrice}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition"
            >
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
