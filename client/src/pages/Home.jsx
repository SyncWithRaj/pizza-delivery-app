import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaPizzaSlice, FaLeaf, FaFire, FaRocket, FaSmileWink } from "react-icons/fa"
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import PopularPicks from '../components/PopularPicks';

const popularItems = [
  {
    id: 1,
    name: "Cheese Burst",
    rating: 4.8,
    price: 160,
    image: "/images/cheese.jpg",
    ingredients: ["6873d4d905c195e991d59e4b", "6873d56405c195e991d59e5d", "6873d63605c195e991d59e73"],
    size: "medium",
  },
  {
    id: 2,
    name: "Spicy Paneer",
    rating: 4.7,
    price: 185,
    image: "/images/paneer.png",
    ingredients: ["6873d54d05c195e991d59e59", "6873d5b905c195e991d59e65", "6873d6fb05c195e991d59e81", "6873d7db05c195e991d59e95"],
    size: "medium",
  },
  {
    id: 3,
    name: "Veggie Overload",
    rating: 4.9,
    price: 195,
    image: "/images/veggie.png",
    ingredients: ["6873d51705c195e991d59e53", "6873d77d05c195e991d59e8d", "6873d6a705c195e991d59e77", "6873d5d505c195e991d59e69", "6873d81a05c195e991d59e99"],
    size: "large",
  },
  {
    id: 4,
    name: "Margherita Classic",
    rating: 4.6,
    price: 150,
    image: "/images/margherita.jpg",
    ingredients: ["6873d4d905c195e991d59e4b", "6873d63605c195e991d59e73"],
    size: "small",
  },
  {
    id: 5,
    name: "BBQ Chicken Feast",
    rating: 4.8,
    price: 220,
    image: "/images/bbq-chicken.jpg",
    ingredients: ["6873d54d05c195e991d59e59", "6873d6fb05c195e991d59e81", "6873d5b905c195e991d59e65"],
    size: "large",
  },
  {
    id: 6,
    name: "Pepperoni Delight",
    rating: 4.7,
    price: 210,
    image: "/images/pepperoni.jpg",
    ingredients: ["6873d54d05c195e991d59e59", "6873d7db05c195e991d59e95"],
    size: "medium",
  },
  {
    id: 7,
    name: "Mexican Wave",
    rating: 4.8,
    price: 200,
    image: "/images/mexican.jpg",
    ingredients: ["6873d5d505c195e991d59e69", "6873d6a705c195e991d59e77", "6873d7db05c195e991d59e95"],
    size: "large",
  },
  {
    id: 8,
    name: "Farmhouse Special",
    rating: 4.9,
    price: 190,
    image: "/images/farmhouse.jpg",
    ingredients: ["6873d51705c195e991d59e53", "6873d81a05c195e991d59e99", "6873d6a705c195e991d59e77"],
    size: "medium",
  },
  {
    id: 9,
    name: "Peri Peri Veg",
    rating: 4.7,
    price: 185,
    image: "/images/peri-peri.jpg",
    ingredients: ["6873d5b905c195e991d59e65", "6873d77d05c195e991d59e8d", "6873d81a05c195e991d59e99"],
    size: "medium",
  },
  {
    id: 10,
    name: "Tandoori Paneer",
    rating: 4.8,
    price: 205,
    image: "/images/tandoori-paneer.jpg",
    ingredients: ["6873d54d05c195e991d59e59", "6873d6fb05c195e991d59e81", "6873d7db05c195e991d59e95", "6873d5d505c195e991d59e69"],
    size: "large",
  },
];


const Home = () => {
  const { user } = useAuth();

  const handleAddPopularToCart = async (item) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      const pizzaRes = await API.post("/pizzas", {
        ingredients: item.ingredients,
        size: item.size,
        customName: item.name,
        totalPrice: item.price,
      });

      const pizza = pizzaRes.data?.data;
      await API.post("/cart/add", { pizzaId: pizza._id });

      toast.success(`${item.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };



  return (
    <div className="bg-[#fff8f0] text-gray-800 -mt-19 overflow-x-hidden">

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[102vh] grid grid-cols-1 md:grid-cols-2"
        style={{ backgroundImage: "url('/images/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50 z-0" />
        <div></div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex items-center justify-center px-6 md:px-16"
        >
          <div className="text-center max-w-4xl space-y-6 backdrop-blur-sm p-8 rounded-xl">
            <div className="perspective text-white font-extrabold drop-shadow-lg">
              <div className="cube-animation">
                <div className="cube-face">Welcome to PizzaVibe 🍕</div>
                <div className="cube-face">Build Your Dream Pizza</div>
                <div className="cube-face">Code Meets Crust 💻🍕</div>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-200 drop-shadow">
              Where code meets crust – build your dream pizza with just a few clicks!
            </p>

            <Link
              to={user ? "/customize" : "/login"}
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg hover:scale-105"
            >
              {user ? "Customize Pizza" : "Get Started"}
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="w-full overflow-hidden bg-white py-4 -mt-34 shadow-md rotate-[-2deg]">
        <div
          className="flex animate-marquee gap-16 text-black text-4xl font-semibold px-4"
          style={{ fontFamily: "'Rubik Burned', cursive", whiteSpace: "nowrap" }}
        >
          {/* First loop */}
          <span>🍕 Discover our most loved pizzas • 🍄 Fresh Ingredients • 🔥 Hot & Fast Delivery •</span>
          <span>🍕 Discover our most loved pizzas • 🍄 Fresh Ingredients • 🔥 Hot & Fast Delivery •</span>

          {/* Repeat for seamless loop */}
          <span>🍕 Discover our most loved pizzas • 🍄 Fresh Ingredients • 🔥 Hot & Fast Delivery •</span>
          <span>🍕 Discover our most loved pizzas • 🍄 Fresh Ingredients • 🔥 Hot & Fast Delivery •</span>
        </div>
      </div>


      {/* Popular Picks */}
      {/* <section className="py-20 pt-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center flex justify-center items-center gap-2">
          <FaStar className="text-yellow-400" />
          Popular Picks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  {item.name}
                </h3>
                <div className="flex items-center text-sm mb-2">
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaStar /> {item.rating}
                  </span>
                  <span className="ml-auto font-bold">₹{item.price}</span>
                </div>
                <button
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold flex justify-center items-center gap-2 transition-all duration-300 hover:scale-105"
                  onClick={() => handleAddPopularToCart(item)}
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      <PopularPicks
        popularItems={popularItems}
        handleAddPopularToCart={handleAddPopularToCart}
      />


      {/* Footer */}
      <footer className="bg-[#ede2d6] text-gray-700 mt-12 border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* About */}
          <div>
            <h4 className="font-bold mb-3">ABOUT PIZZAVIBE</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Who We Are</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Work With Us</a></li>
              <li><a href="#" className="hover:underline">Investor Relations</a></li>
              <li><a href="#" className="hover:underline">Report Fraud</a></li>
              <li><a href="#" className="hover:underline">Press Kit</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* PizzaVerse */}
          <div>
            <h4 className="font-bold mb-3">PIZZAVERSE</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">PizzaVibe</a></li>
              <li><a href="#" className="hover:underline">FastCrust</a></li>
              <li><a href="#" className="hover:underline">CheeseLand</a></li>
              <li><a href="#" className="hover:underline">Feeding Smiles</a></li>
              <li><a href="#" className="hover:underline">Pizza Live</a></li>
              <li><a href="#" className="hover:underline">PizzaFest</a></li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div>
            <h4 className="font-bold mb-3">FOR RESTAURANTS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Partner With Us</a></li>
              <li><a href="#" className="hover:underline">Apps For You</a></li>
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="font-bold mb-3">LEARN MORE</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-3">SOCIAL LINKS</h4>
            <div className="flex space-x-4 text-2xl mb-4">
              <a href="https://www.linkedin.com/in/raj-ribadiya/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/ribadiya_raj/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="https://x.com/ribadiya_rajj" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
                <FaTwitter />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                <FaYoutube />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaFacebookF />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 px-6 text-sm text-center text-gray-500">
          <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.</p>
          <p className="mt-2">2025 © PizzaVibe. All rights reserved.</p>
        </div>
      </footer>



    </div>
  );
};

export default Home;
