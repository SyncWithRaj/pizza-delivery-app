import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { FaEnvelope } from "react-icons/fa";

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
    <div className="min-h-[90vh] flex items-center justify-center bg-[#fff8f0] px-4">
      <div className="bg-white border rounded-2xl shadow-xl p-10 max-w-md w-full space-y-6 transition duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-red-600 flex items-center justify-center gap-2">
          <FaEnvelope /> Forgot Password?
        </h2>
        <p className="text-center text-sm text-gray-600">
          We'll send you a reset link on your registered email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* <p className="text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <a href="/login" className="text-red-500 font-semibold hover:underline">
            Login here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
