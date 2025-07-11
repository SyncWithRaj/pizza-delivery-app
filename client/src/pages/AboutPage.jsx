import React from "react";
import { motion } from "framer-motion";
import {
  FaPizzaSlice,
  FaUsers,
  FaFireAlt,
  FaSmileBeam,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-[#fff8f0] px-6 py-16 flex flex-col justify-center items-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-red-600 mb-10 flex items-center gap-3"
      >
        <FaPizzaSlice className="text-4xl animate-bounce" />
        About PizzaVibe
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-14"
      >
        At <span className="text-red-500 font-semibold">PizzaVibe</span>, it’s more than just pizza. It's a vibe.
        From bold flavors to custom builds, you’re the chef and the star of every slice.
      </motion.p>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl"
      >
        <Card
          icon={<FaFireAlt className="text-red-500 text-4xl" />}
          title="Freshly Baked"
          desc="Every pizza is crafted with premium, fresh ingredients and baked to perfection."
        />
        <Card
          icon={<FaUsers className="text-yellow-500 text-4xl" />}
          title="For Everyone"
          desc="Whether you're a foodie or an admin, the platform is built for all users seamlessly."
        />
        <Card
          icon={<FaSmileBeam className="text-green-500 text-4xl" />}
          title="Delightful UX"
          desc="From start to checkout, the entire pizza-making journey is smooth and fun."
        />
        <Card
          icon={<FaPizzaSlice className="text-purple-500 text-4xl" />}
          title="Custom Pizzas"
          desc="Mix & match ingredients to make your own signature pizza. 🍕✨"
        />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-20 text-center text-sm text-gray-400"
      >
        Made with <span className="text-red-500">❤️</span> by Raj Ribadiya • PizzaVibe &copy;{" "}
        {new Date().getFullYear()}
      </motion.div>
    </div>
  );
};

const Card = ({ icon, title, desc }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default About;
