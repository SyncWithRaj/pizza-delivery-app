import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaLock,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fff8f0]">
        <p className="text-gray-600 text-lg">User not found.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${user._id}`);
      setUser(null);
      toast.success("Account deleted successfully");
      navigate("/register");
    } catch (err) {
      toast.error("Failed to delete account");
      console.error(err);
    }
  };

  return (
    <div className="bg-[#fff8f0] min-h-[90vh] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
          <FaUserAlt /> My Profile
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-md border space-y-6 transition duration-300 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <FaUserAlt className="text-xl text-red-500" />
            <p className="text-gray-800 text-lg">
              <strong>Name:</strong> {user.fullName}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-xl text-red-500" />
            <p className="text-gray-800 text-lg">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          {user.phone && (
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-xl text-red-500" />
              <p className="text-gray-800 text-lg">
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl text-red-500" />
              <p className="text-gray-800 text-lg">
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          )}

          <p className="pt-2 text-sm text-gray-500">
            You are logged in as{" "}
            <span className="font-semibold text-red-600">{user.role.toUpperCase()}</span>
          </p>

          {/* 🔧 Action Buttons */}
          <div className="pt-6 flex flex-wrap gap-4 justify-between">
            <Link
              to="/update-profile"
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              <FaEdit /> Edit Profile
            </Link>

            <Link
              to="/forgot-password"
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-red-500 text-red-600 font-semibold hover:bg-red-50 transition"
            >
              <FaLock /> Forgot Password
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-500 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
