import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { motion } from "framer-motion";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { emailOrUsername, password });
      const loggedInUser = res.data.data;

      setUser(loggedInUser);

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success(`Welcome back, ${loggedInUser.fullName || "User"}!`);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Username or password is incorrect";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#fff8f0] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-red-500"
        >
          Welcome Back! 🍕
        </motion.h2>
        <p className="text-center text-sm text-gray-600 mt-2">
          Login to your PizzaVibe account
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter email or username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              required
            />
            <div className="text-right mt-1">
              <a
                href="/login-otp"
                className="text-sm text-red-500 hover:underline"
              >
                Forgot Password? Login with OTP
              </a>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-full transition-all shadow-md"
          >
            Login
          </motion.button>
        </motion.form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
