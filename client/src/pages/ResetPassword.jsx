import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Please fill both fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8f0] px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl max-w-md w-full space-y-6 border">
        <h2 className="text-3xl font-extrabold text-center text-red-500">
          🔐 Reset Password
        </h2>
        <p className="text-center text-sm text-gray-600">
          Enter and confirm your new password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
