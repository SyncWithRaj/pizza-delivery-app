import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaPlus,
  FaTrash,
  FaLeaf,
  FaMoneyBillWave,
  FaBoxes,
  FaListUl,
  FaPizzaSlice,
  FaTint,
  FaCheese,
  FaCarrot,
} from "react-icons/fa";
import toast from "react-hot-toast";

const AdminIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState("base");
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);

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

    if (!name || !type || !price || !stock || !imageFile) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "pizza_ingredient_upload");

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/mrcoderraj/image/upload", {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;

      const res = await API.post("/ingredients", {
        name,
        type,
        price: Number(price),
        stock: Number(stock),
        image: imageUrl,
      });

      setIngredients((prev) => [...prev, res.data.data]);
      setNewIngredient({ name: "", type: "", price: "", stock: "" });
      setImageFile(null);
      toast.success("Ingredient added with image!");
    } catch (err) {
      console.error(err);
      toast.error("Add failed");
    }
  };

  useEffect(() => {
    fetchIngredients(); // Initial fetch

    const interval = setInterval(() => {
      fetchIngredients(); // Auto-refresh every 10 sec
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const tabItems = [
    { type: "base", icon: <FaPizzaSlice />, label: "Base" },
    { type: "sauce", icon: <FaTint />, label: "Sauce" },
    { type: "cheese", icon: <FaCheese />, label: "Cheese" },
    { type: "veggie", icon: <FaCarrot />, label: "Veggie" },
  ];

  const filteredIngredients = ingredients.filter((ing) => ing.type === selectedType);

  return (
    <div className="p-16 max-w-full min-h-[91vh] mx-auto bg-[#fff8f0]">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6 flex items-center justify-center gap-2">
        <FaListUl /> Manage Ingredients
      </h2>

      {/* Add Ingredient Form */}
      <form
        onSubmit={addIngredient}
        className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-10 shadow-sm space-y-4 max-w-5xl mx-auto"
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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

      {/* Refresh Button */}
      <div className="flex justify-end max-w-5xl mx-auto mb-2">
        <button
          onClick={fetchIngredients}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition text-sm"
        >
          🔄 Refresh Stocks
        </button>
      </div>

      {/* Tab Menu */}
      <div className="flex justify-center gap-4 mb-6 max-w-5xl mx-auto">
        {tabItems.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setSelectedType(tab.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
              selectedType === tab.type
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Ingredients List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {filteredIngredients.map((ing) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p className="flex items-center gap-2">
                <strong>Type:</strong> {ing.type}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                <strong>Price:</strong> ₹{ing.price}
              </p>
              <p
                className={`flex items-center gap-2 ${
                  ing.stock < 10 ? "text-red-600 font-semibold" : "text-gray-700"
                }`}
              >
                <FaBoxes className={`${ing.stock < 10 ? "text-red-600" : "text-yellow-600"}`} />
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
