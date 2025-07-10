import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaShoppingCart, FaStar } from "react-icons/fa";

// ✅ Replace these with actual MongoDB ingredient _ids
const popularItems = [
  {
    id: 1,
    name: "Cheese Burst",
    rating: 4.8,
    price: 249,
    image: "/images/cheese.jpg",
    ingredients: ["686bb904f814504f97ae2e20", "686bb942f814504f97ae2e2e", "686bb950f814504f97ae2e36"],
    size: "medium",
  },
  {
    id: 2,
    name: "Spicy Paneer",
    rating: 4.7,
    price: 299,
    image: "/images/paneer.png",
    ingredients: ["686bb90ff814504f97ae2e24", "686bb93af814504f97ae2e2a", "686bb950f814504f97ae2e36", "686bb962f814504f97ae2e3e"],
    size: "medium",
  },
  {
    id: 3,
    name: "Veggie Overload",
    rating: 4.9,
    price: 279,
    image: "/images/veggie.png",
    ingredients: ["686bb904f814504f97ae2e20", "686bb942f814504f97ae2e2e", "686bb949f814504f97ae2e32", "686bb95bf814504f97ae2e3a", "686bb96af814504f97ae2e44"],
    size: "large",
  },
];

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    // You can add any redirect logic here if needed
  }, [user]);

  const handleAddPopularToCart = async (item) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      // 1. Create pizza
      const pizzaRes = await API.post("/pizzas", {
        ingredients: item.ingredients,
        size: item.size,
        customName: item.name,
        totalPrice: item.price,
      });

      const pizza = pizzaRes.data?.data;

      // 2. Add to cart
      await API.post("/cart/add", { pizzaId: pizza._id });

      toast.success(`${item.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <>
      <div className="bg-[#fff8f0] text-gray-800 -mt-19">
        {/* Hero */}
        <section
          className="relative bg-cover bg-center h-[101vh]"
          style={{ backgroundImage: "url('/images/delicious-pizza-studio.jpg')" }}
        >
          <div className="absolute inset-0 bg-opacity-50 flex flex-col top-[380px] items-center text-center px-4">
            <Link
              to={user ? "/customize" : "/login"}
              className="bg-white hover:bg-gray-300 text-red-700 px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg"
            >
              {user ? "Customize Pizza" : "Get Started"}
            </Link>
          </div>
        </section>

        {/* Popular Picks */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-10 text-center flex justify-center items-center gap-2"><FaStar className="text-yellow-400"/>  Popular Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-yellow-500 flex items-center gap-1">
                      <FaStar /> {item.rating}
                    </span>
                    <span className="ml-auto font-bold">₹{item.price}</span>
                  </div>
                  <button
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold flex justify-center items-center gap-2"
                    onClick={() => handleAddPopularToCart(item)}
                  >
                    <FaShoppingCart className="text-lg" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
