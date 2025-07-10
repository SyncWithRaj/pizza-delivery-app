import React from "react";
import { FaPizzaSlice, FaUsers, FaFireAlt, FaSmileBeam } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8 flex items-center justify-center gap-2">
        <FaPizzaSlice /> About PizzaVibe
      </h1>

      <p className="text-gray-700 text-lg mb-10 text-center max-w-3xl mx-auto">
        At <strong>PizzaVibe</strong>, we believe in more than just pizza. We're here to deliver joy, flavor, and a sprinkle of innovation in every slice. Whether you're a thin crust lover or a cheese burst fan, we've got something for everyone!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
          <FaFireAlt className="text-3xl text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Freshly Baked</h3>
          <p className="text-gray-600">
            Every pizza is made with love using the freshest ingredients. No shortcuts, just great taste.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
          <FaUsers className="text-3xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Built for Everyone</h3>
          <p className="text-gray-600">
            We serve both pizza lovers and pizza creators. Admins manage, customers order. Simple and seamless.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
          <FaSmileBeam className="text-3xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Delightful Experience</h3>
          <p className="text-gray-600">
            From customization to checkout, our platform is designed to be smooth, fun, and delightful.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
          <FaPizzaSlice className="text-3xl text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Custom Pizzas</h3>
          <p className="text-gray-600">
            Mix & match your own ingredients to create the perfect pizza for your vibe. 🍕✨
          </p>
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-gray-500">
        Made with ❤️ by Raj Ribadiya • PizzaVibe &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default About;
