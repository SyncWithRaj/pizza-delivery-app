import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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

      // 🔁 Redirect based on role
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
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f0] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-red-500">
          Welcome Back! 🍕
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Login to your PizzaVibe account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter email or username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <div className="text-right mt-1">
              <p className="text-sm text-right text-gray-600">
                <a href="/login-otp" className="text-red-500 hover:underline">
                  Forgot Password? Login with OTP
                </a>
              </p>

            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );

};

export default Login;
