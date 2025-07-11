import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const LoginWithOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await API.post("/auth/send-login-otp", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await API.post("/auth/login-with-otp", { email, otp });
      setUser(res.data.data);
      toast.success(`Welcome back, ${res.data.data.fullName}`);
      navigate(res.data.data.role === "admin" ? "/admin" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f0] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-red-600 flex items-center justify-center gap-2">
          <FaLock /> Login via OTP
        </h2>
        <p className="text-center text-gray-500 text-sm">Secure access without password</p>

        {step === 1 ? (
          <>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-red-400 focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-red-400 focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-red-500 text-white py-2 rounded-full font-semibold hover:bg-red-600 transition"
            >
              Verify & Login
            </button>
          </>
        )}

        <p className="text-sm text-center text-gray-600">
          <a href="/login" className="text-red-500 font-semibold hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginWithOtp;
