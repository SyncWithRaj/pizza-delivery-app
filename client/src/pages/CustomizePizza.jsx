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
        console.error("Error fetching ingredients", err);
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

      // Reset form
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
      console.error(err);
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
        className={`cursor-pointer rounded-lg border p-3 w-36 text-center transition ${
          isSelected ? "border-red-500 bg-red-50" : "hover:shadow"
        }`}
      >
        <img
          src={item.image || "/icons/placeholder.svg"}
          alt={item.name}
          className="h-16 w-16 mx-auto mb-2 object-contain"
        />
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-gray-500">₹{item.price}</p>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleAddToCart}
      className="max-w-5xl mx-auto p-6 bg-white shadow-xl mt-10 rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-red-500">
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
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
      />

      {/* Size */}
      <div>
        <label className="block font-medium mb-2 text-gray-700">Choose Size</label>
        <div className="flex gap-4">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelected({ ...selected, size })}
              className={`px-4 py-2 rounded-full border font-semibold transition ${
                selected.size === size
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-100"
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)} (
              ₹{size === "small" ? 30 : size === "medium" ? 40 : 50})
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Types */}
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

      {/* Veggies */}
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
          Total: ₹{totalPrice} × {quantity} = ₹{totalPrice * quantity}
        </div>

        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold"
            >
              −
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </form>
  );
};

export default CustomizePizza;
