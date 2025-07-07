import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CustomizePizza = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState({
    base: "",
    sauce: "",
    cheese: "",
    veggies: [],
    size: "medium",
    customName: "",
    deliveryAddress: "",
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

  const getIngredientsByType = (type) =>
    ingredients.filter((ing) => ing.type === type);

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

  const handleChange = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const handleVegToggle = (id) => {
    setSelected((prev) => ({
      ...prev,
      veggies: prev.veggies.includes(id)
        ? prev.veggies.filter((v) => v !== id)
        : [...prev.veggies, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { base, sauce, cheese, deliveryAddress } = selected;

    if (!base || !sauce || !cheese || !deliveryAddress) {
      alert("Please select base, sauce, cheese and enter address.");
      return;
    }

    const allIngredientIds = [
      base,
      sauce,
      cheese,
      ...selected.veggies,
    ].filter(Boolean);

    try {
      // ✅ 1. Create Pizza
      const pizzaRes = await API.post("/pizzas", {
        ingredients: allIngredientIds,
        size: selected.size,
        customName: selected.customName,
        totalPrice,
      });

      const pizza = pizzaRes.data?.data;

      // ✅ 2. Create Order
      const orderRes = await API.post("/orders", {
        pizzas: [pizza._id],
        deliveryAddress,
      });

      const order = orderRes.data?.data;

      // ✅ 3. Razorpay Order
      const razorRes = await API.post("/razorpay/create-order", {
        amount: totalPrice,
      });

      const { orderId } = razorRes.data?.data;

      // ✅ 4. Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: "INR",
        name: "Pizza Delivery",
        description: "Custom Pizza Order",
        order_id: orderId,
        handler: async function (response) {
          try {
            await API.post("/razorpay/verify", {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            alert("Payment successful! Redirecting to your orders...");
            navigate("/my-orders"); // ✅ Redirect after success
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Payment verification failed");
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
      alert("Order failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-10 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">🍕 Customize Your Pizza</h2>

      <input
        type="text"
        name="customName"
        value={selected.customName}
        onChange={handleChange}
        placeholder="Custom Pizza Name (optional)"
        className="w-full p-2 border rounded"
      />

      <div>
        <label className="block font-medium mb-1">Select Size:</label>
        <select
          name="size"
          value={selected.size}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="small">Small (₹30)</option>
          <option value="medium">Medium (₹40)</option>
          <option value="large">Large (₹50)</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Choose Base:</label>
        <select
          name="base"
          value={selected.base}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Base --</option>
          {getIngredientsByType("base").map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} (₹{item.price})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Choose Sauce:</label>
        <select
          name="sauce"
          value={selected.sauce}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Sauce --</option>
          {getIngredientsByType("sauce").map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} (₹{item.price})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Choose Cheese:</label>
        <select
          name="cheese"
          value={selected.cheese}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Cheese --</option>
          {getIngredientsByType("cheese").map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} (₹{item.price})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Add Veggies:</label>
        <div className="flex flex-wrap gap-2">
          {getIngredientsByType("veggie").map((item) => (
            <label key={item._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.veggies.includes(item._id)}
                onChange={() => handleVegToggle(item._id)}
              />
              {item.name} (₹{item.price})
            </label>
          ))}
        </div>
      </div>

      <textarea
        name="deliveryAddress"
        rows={3}
        value={selected.deliveryAddress}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Enter your delivery address"
      />

      <div className="text-right font-semibold text-lg">
        Total Price: ₹{totalPrice}
      </div>

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Place Order & Pay
      </button>
    </form>
  );
};

export default CustomizePizza;
