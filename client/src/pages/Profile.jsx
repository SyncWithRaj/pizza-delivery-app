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
      <div className="min-h-[60vh] flex items-center justify-center">
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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
        <FaUserAlt /> My Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border space-y-6">
        <div className="flex items-center gap-4">
          <FaUserAlt className="text-xl text-red-500" />
          <p className="text-gray-700 text-lg">
            <strong>Name:</strong> {user.fullName}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaEnvelope className="text-xl text-red-500" />
          <p className="text-gray-700 text-lg">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {user.phone && (
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-xl text-red-500" />
            <p className="text-gray-700 text-lg">
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
        )}

        {user.address && (
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-xl text-red-500" />
            <p className="text-gray-700 text-lg">
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        )}

        <div className="pt-4 text-sm text-gray-500">
          You are logged in as{" "}
          <span className="font-semibold text-red-500">
            {user.role.toUpperCase()}
          </span>
        </div>

        {/* 🔧 Action Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6">
          <Link
            to="/update-profile"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition"
          >
            <FaEdit /> Edit Profile
          </Link>

          <Link
            to="/forgot-password"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-400 rounded-full hover:bg-red-50 transition"
          >
            <FaLock /> Forgot Password
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-400 rounded-full hover:bg-gray-100 transition"
          >
            <FaTrash /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
