import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaPizzaSlice,
  FaRupeeSign,
  FaTrashAlt,
  FaArrowsAltH,
} from "react-icons/fa";
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
    <div className="p-6 max-w-full mx-auto min-h-[90vh] bg-[#fff8f0]">
      <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
        <FaPizzaSlice /> All Pizzas
      </h2>

      {pizzas.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pizzas available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="bg-white border rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaPizzaSlice className="text-red-500" />
                  {pizza.customName || "Custom Pizza"}
                </h3>
                <button
                  onClick={() => deletePizza(pizza._id)}
                  className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </div>

              <div className="flex justify-between text-gray-700 text-sm font-medium">
                <p className="flex items-center gap-1">
                  <FaRupeeSign className="text-green-600" />
                  Price: ₹{pizza.totalPrice + 30}
                </p>
                <p className="flex items-center gap-1">
                  <FaArrowsAltH className="text-yellow-600" />
                  Size: {pizza.size}
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
