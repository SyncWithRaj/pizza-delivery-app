import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const CustomizePizza = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
    size: "medium",
    customName: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await API.get("/ingredients");
        setIngredients(res.data?.data || []);
      } catch (err) {
        toast.error("Failed to fetch ingredients");
      }
    };
    fetchIngredients();
  }, []);

  const getByType = (type) => ingredients.filter((i) => i.type === type);

  useEffect(() => {
    let price = 0;
    const base = ingredients.find((i) => i._id === selected.base);
    const sauce = ingredients.find((i) => i._id === selected.sauce);
    const cheese = ingredients.find((i) => i._id === selected.cheese);
    const veggies = ingredients.filter((i) =>
      selected.veggies.includes(i._id)
    );

    if (base) price += base.price;
    if (sauce) price += sauce.price;
    if (cheese) price += cheese.price;
    price += veggies.reduce((sum, veg) => sum + veg.price, 0);

    const sizePrice = { small: 30, medium: 40, large: 50 };
    price += sizePrice[selected.size] || 0;

    setTotalPrice(price);
  }, [selected, ingredients]);

  const handleSelect = (type, id) => {
    setSelected({ ...selected, [type]: id });
  };

  const handleVegToggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      veggies: prev.veggies.includes(id)
        ? prev.veggies.filter((v) => v !== id)
        : [...prev.veggies, id],
    }));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const { base, sauce, cheese } = selected;

    if (!base || !sauce || !cheese) {
      toast.error("Please select base, sauce and cheese.");
      return;
    }

    const allIngredientIds = [base, sauce, cheese, ...selected.veggies];

    try {
      setLoading(true);
      const pizzaRes = await API.post("/pizzas", {
        ingredients: allIngredientIds,
        size: selected.size,
        customName: selected.customName,
        totalPrice: totalPrice * quantity,
        quantity,
      });

      const pizza = pizzaRes.data?.data;
      await addToCart(pizza, quantity);
      toast.success("Pizza added to cart!");

      setSelected({
        base: "",
        sauce: "",
        cheese: "",
        veggies: [],
        size: "medium",
        customName: "",
      });
      setQuantity(1);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const IngredientCard = ({ item, selectedId, type, isMulti = false }) => {
    const isSelected = isMulti
      ? selected.veggies.includes(item._id)
      : selected[type] === item._id;

    return (
      <div
        onClick={() =>
          isMulti ? handleVegToggle(item._id) : handleSelect(type, item._id)
        }
        className={`cursor-pointer rounded-xl border p-4 w-36 text-center transition-all duration-200 ease-in-out transform ${
          isSelected
            ? "bg-red-100 border-red-500 scale-105 shadow-md"
            : "hover:shadow hover:scale-105"
        }`}
      >
        <img
          src={item.image || "/icons/placeholder.svg"}
          alt={item.name}
          className="h-16 w-16 mx-auto mb-2 object-contain transition-transform duration-200"
        />
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-gray-500">₹{item.price}</p>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleAddToCart}
      className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-red-50 to-white shadow-xl mt-10 rounded-xl space-y-6 animate-fade-in mb-10 pt-14 "
    >
      <h2 className="text-4xl font-extrabold text-center text-red-600 drop-shadow-sm">
        🍕 Build Your Dream Pizza
      </h2>

      <input
        type="text"
        name="customName"
        value={selected.customName}
        onChange={(e) =>
          setSelected({ ...selected, customName: e.target.value })
        }
        placeholder="Custom Pizza Name (optional)"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 shadow-sm"
      />

      {/* Size Selection */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Choose Size</label>
        <div className="flex gap-4">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelected({ ...selected, size })}
              className={`px-5 py-2 rounded-full border font-semibold transition-all duration-200 ${
                selected.size === size
                  ? "bg-red-500 text-white shadow"
                  : "hover:bg-red-100"
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)} (
              ₹{size === "small" ? 30 : size === "medium" ? 40 : 50})
            </button>
          ))}
        </div>
      </div>

      {/* Base, Sauce, Cheese Sections */}
      {["base", "sauce", "cheese"].map((type) => (
        <div key={type}>
          <label className="block font-medium mb-2 capitalize text-gray-700">
            Choose {type}
          </label>
          <div className="flex flex-wrap gap-4">
            {getByType(type).map((item) => (
              <IngredientCard
                key={item._id}
                item={item}
                selectedId={selected[type]}
                type={type}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Veggies Section */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Add Veggies</label>
        <div className="flex flex-wrap gap-4">
          {getByType("veggie").map((item) => (
            <IngredientCard
              key={item._id}
              item={item}
              type="veggies"
              isMulti={true}
            />
          ))}
        </div>
      </div>

      {/* Quantity & Submit */}
      <div className="flex justify-between items-center pt-4 flex-wrap gap-4">
        <div className="text-xl font-semibold text-gray-800">
          Total: ₹{totalPrice} × {quantity} ={" "}
          <span className="text-green-600 font-bold">₹{totalPrice * quantity}</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold transition"
            >
              −
            </button>
            <span className="px-4 py-1 bg-white">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold transition"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </form>
  );
};

export default CustomizePizza;
