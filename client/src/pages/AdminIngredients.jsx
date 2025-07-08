import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaPlus,
  FaTrash,
  FaLeaf,
  FaMoneyBillWave,
  FaBoxes,
  FaListUl,
} from "react-icons/fa";
import toast from "react-hot-toast";

const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
  });

  const fetchIngredients = async () => {
    try {
      const res = await API.get("/ingredients");
      setIngredients(res.data.data);
    } catch {
      toast.error("Failed to fetch ingredients");
    }
  };

  const deleteIngredient = async (id) => {
    try {
      await API.delete(`/ingredients/${id}`);
      setIngredients((prev) => prev.filter((ing) => ing._id !== id));
      toast.success("Ingredient deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleInputChange = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  const addIngredient = async (e) => {
    e.preventDefault();
    const { name, type, price, stock } = newIngredient;

    if (!name || !type || !price || !stock) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/ingredients", {
        name,
        type,
        price: Number(price),
        stock: Number(stock),
      });
      setIngredients((prev) => [...prev, res.data.data]);
      setNewIngredient({ name: "", type: "", price: "", stock: "" });
      toast.success("Ingredient added");
    } catch {
      toast.error("Add failed");
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6 flex items-center justify-center gap-2">
        <FaListUl /> Manage Ingredients
      </h2>

      {/* Add Form */}
      <form
        onSubmit={addIngredient}
        className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-8 shadow-sm space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center gap-2 text-green-700 mb-2">
          <FaPlus /> Add New Ingredient
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={newIngredient.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            name="type"
            value={newIngredient.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Select Type --</option>
            <option value="base">Base</option>
            <option value="sauce">Sauce</option>
            <option value="cheese">Cheese</option>
            <option value="veggie">Veggie</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newIngredient.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newIngredient.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition"
        >
          Add Ingredient
        </button>
      </form>

      {/* Ingredient List */}
      <div className="space-y-4">
        {ingredients.map((ing) => (
          <div
            key={ing._id}
            className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaLeaf className="text-green-500" /> {ing.name}
              </h4>
              <button
                onClick={() => deleteIngredient(ing._id)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
              >
                <FaTrash /> Delete
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <strong>Type:</strong> {ing.type}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                <strong>Price:</strong> ₹{ing.price}
              </p>
              <p className="flex items-center gap-2">
                <FaBoxes className="text-yellow-600" />
                <strong>Stock:</strong> {ing.stock}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminIngredients;
