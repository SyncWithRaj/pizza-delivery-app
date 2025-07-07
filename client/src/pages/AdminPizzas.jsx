import { useEffect, useState } from "react";
import API from "../services/api";

const AdminPizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const res = await API.get("/pizzas");
      setPizzas(res.data.data);
    } catch {
      alert("Failed to load pizzas");
    }
  };

  const deletePizza = async (id) => {
    try {
      await API.delete(`/pizzas/${id}`);
      setPizzas((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🍕 All Pizzas</h2>
      {pizzas.map((pizza) => (
        <div key={pizza._id} className="border p-4 mb-3 rounded">
          <p><b>Name:</b> {pizza.customName || "Custom Pizza"}</p>
          <p><b>Price:</b> ₹{pizza.totalPrice + 30}</p>
          <p><b>Size:</b> {pizza.size}</p>
          <button
            onClick={() => deletePizza(pizza._id)}
            className="bg-red-600 text-white px-3 py-1 mt-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPizzas;
