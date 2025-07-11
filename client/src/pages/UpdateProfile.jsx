import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    try {
      await API.post("/users/send-otp", { email: form.email });
      toast.success("OTP sent to your email!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter OTP");

    try {
      const res = await API.put("/users/update", {
        username: form.username,
        email: form.email,
        otp,
      });
      toast.success("Profile updated successfully");
      setUser(res.data.data);
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f0] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-red-500">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={sendOTP}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-semibold"
            >
              Send OTP
            </button>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
              >
                Verify OTP & Update
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
