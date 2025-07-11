import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.email) return toast.error("Please enter email first");
    try {
      await API.post("/auth/send-otp", { email: form.email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setUser(res.data.data);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#fff8f0] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-red-500"
        >
          Create Account 🍕
        </motion.h2>

        <p className="text-center text-sm text-gray-600">Register with OTP verification</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <InputField
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={sendOtp}
            className="px-4 py-2 w-full bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
          >
            Send OTP
          </button>

          {otpSent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <InputField
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
              />
            </motion.div>
          )}

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value="user">👤 User</option>
            <option value="admin">🛠️ Admin</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-full shadow-md transition-all"
          >
            Register
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

const InputField = ({ type = "text", name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all shadow-sm"
    required
  />
);

export default Register;
