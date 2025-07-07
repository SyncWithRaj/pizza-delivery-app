import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({ pizzaId }) => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const res = await API.post("/orders", {
        pizzas: [pizzaId],
        deliveryAddress: address,
      });
      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <h2 className="text-xl font-semibold mb-4">Enter Delivery Address</h2>
      <textarea
        rows={3}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="e.g. 123 Main St, Ahmedabad"
      />
      <button
        onClick={handleOrder}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
