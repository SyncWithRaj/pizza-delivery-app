import { useEffect, useState } from "react";
import API from "../services/api";
import { FaPizzaSlice, FaRupeeSign, FaTrashAlt, FaArrowsAltH } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminPizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const res = await API.get("/pizzas");
      setPizzas(res.data.data);
    } catch {
      toast.error("Failed to load pizzas");
    }
  };

  const deletePizza = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pizza?")) return;
    try {
      await API.delete(`/pizzas/${id}`);
      setPizzas((prev) => prev.filter((p) => p._id !== id));
      toast.success("Pizza deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8 flex items-center justify-center gap-2">
        <FaPizzaSlice /> All Pizzas
      </h2>

      {pizzas.length === 0 ? (
        <p className="text-center text-gray-500">No pizzas available.</p>
      ) : (
        <div className="grid gap-6">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaPizzaSlice className="text-red-500" />
                  {pizza.customName || "Custom Pizza"}
                </h3>
                <button
                  onClick={() => deletePizza(pizza._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-700 text-sm">
                <p className="flex items-center gap-1">
                  <FaRupeeSign /> <span className="font-medium">Price:</span> ₹
                  {pizza.totalPrice + 30}
                </p>
                <p className="flex items-center gap-1">
                  <FaArrowsAltH /> <span className="font-medium">Size:</span>{" "}
                  {pizza.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPizzas;
