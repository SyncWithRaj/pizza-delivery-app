import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const testimonials = [
  { name: "Aman", feedback: "Absolutely loved the pizza! Super fast delivery too." },
  { name: "Pooja", feedback: "The custom pizza feature is amazing. 10/10!" },
  { name: "Ravi", feedback: "Best delivery experience ever. Clean UI and hot pizza." },
];

const popularItems = [
  { id: 1, name: "Cheese Burst", rating: 4.8, price: 249, image: "/images/cheese-burst.jpg" },
  { id: 2, name: "Spicy Paneer", rating: 4.7, price: 299, image: "/images/paneer.jpg" },
  { id: 3, name: "Veggie Overload", rating: 4.9, price: 279, image: "/images/veggie.jpg" },
];

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Redirect logic if needed
  }, [user]);

  return (
    <div className="bg-[#fff8f0] text-gray-800">

      {/* Hero */}
      <section className="relative bg-cover bg-center h-[70vh]" style={{ backgroundImage: "url('/images/pizza-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">Delicious Pizza Delivered Fast</h1>
          <Link to={user ? "/customize" : "/login"} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            {user ? "Customize Pizza" : "Get Started"}
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">🍽️ Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {["Pizza", "Sides", "Drinks", "Desserts"].map(cat => (
            <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-xl flex flex-col items-center space-y-3">
              <img src={`/icons/${cat.toLowerCase()}.svg`} alt={cat} className="h-16 w-16" />
              <span className="font-semibold text-lg">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Picks */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">⭐ Popular Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-yellow-500 mr-2">★ {item.rating}</span>
                  <span className="ml-auto font-bold">₹{item.price}</span>
                </div>
                <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#ffe8e2] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-red-500">5K+</p>
            <p className="text-lg mt-1">Orders Delivered</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-red-500">10K+</p>
            <p className="text-lg mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-red-500">4.9★</p>
            <p className="text-lg mt-1">App Rating</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">💬 What Our Customers Say</h2>
        <div className="space-y-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-lg italic">“{t.feedback}”</p>
              <p className="mt-4 font-semibold">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
