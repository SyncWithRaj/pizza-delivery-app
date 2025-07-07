import { useEffect, useState } from "react";
import API from "../services/api";

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
      alert("Failed to fetch ingredients");
    }
  };

  const deleteIngredient = async (id) => {
    try {
      await API.delete(`/ingredients/${id}`);
      setIngredients((prev) => prev.filter((ing) => ing._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleInputChange = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  const addIngredient = async (e) => {
    e.preventDefault();
    const { name, type, price, stock } = newIngredient;

    if (!name || !type || !price || !stock) {
      alert("Please fill all fields");
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
    } catch {
      alert("Add failed");
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧂 Manage Ingredients</h2>

      {/* Add Form */}
      <form onSubmit={addIngredient} className="bg-gray-100 p-4 rounded mb-6 space-y-3">
        <h3 className="text-lg font-semibold">➕ Add Ingredient</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newIngredient.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="type"
          value={newIngredient.type}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newIngredient.stock}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Ingredient
        </button>
      </form>

      {/* Ingredient List */}
      <div>
        {ingredients.map((ing) => (
          <div key={ing._id} className="border p-4 rounded mb-3">
            <p><b>Name:</b> {ing.name}</p>
            <p><b>Type:</b> {ing.type}</p>
            <p><b>Price:</b> ₹{ing.price}</p>
            <p><b>Stock:</b> {ing.stock}</p>
            <button
              onClick={() => deleteIngredient(ing._id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminIngredients;
