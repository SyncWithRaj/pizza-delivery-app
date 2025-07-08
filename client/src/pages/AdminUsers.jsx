import { useEffect, useState } from "react";
import API from "../services/api";
import { FaUser, FaUserShield, FaUserTag } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // Must be admin-protected
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6 flex items-center justify-center gap-2">
        <FaUserShield /> All Users
      </h2>

      {/* Total Count */}
      <div className="text-lg text-gray-700 mb-6 text-center">
        Total Registered Users:{" "}
        <span className="font-bold text-green-700">{users.length}</span>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaUser className="text-blue-500 text-xl" />
              <p className="font-semibold text-gray-800">{user.username}</p>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <FaUserTag className="inline-block mr-2 text-yellow-600" />
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Role:</strong>{" "}
              <span
                className={`font-semibold px-2 py-0.5 rounded ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
