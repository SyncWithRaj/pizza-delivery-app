// pages/ForgotPassword.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Reset link sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8f0] px-4">
      <div className="bg-white shadow-xl p-8 rounded-xl max-w-md w-full space-y-6 border">
        <h2 className="text-2xl font-bold text-center text-red-500">Forgot Password?</h2>
        <p className="text-center text-sm text-gray-600">We'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
