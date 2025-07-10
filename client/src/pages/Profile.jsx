import { useAuth } from "../context/AuthContext";
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div className="text-center py-10">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
        <FaUserAlt /> My Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border space-y-4">
        <div className="flex items-center gap-4">
          <FaUserAlt className="text-xl text-red-500" />
          <p className="text-gray-700 text-lg">
            <b>Name:</b> {user.fullName}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaEnvelope className="text-xl text-red-500" />
          <p className="text-gray-700 text-lg">
            <b>Email:</b> {user.email}
          </p>
        </div>

        {user.phone && (
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-xl text-red-500" />
            <p className="text-gray-700 text-lg">
              <b>Phone:</b> {user.phone}
            </p>
          </div>
        )}

        {user.address && (
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-xl text-red-500" />
            <p className="text-gray-700 text-lg">
              <b>Address:</b> {user.address}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 pt-4">
          You are logged in as <span className="font-semibold">{user.role.toUpperCase()}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
