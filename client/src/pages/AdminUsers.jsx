import { useEffect, useState } from "react";
import API from "../services/api";
import { FaUser, FaUserShield, FaUserTag } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // Admin-protected route
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
    <div className="min-h-[90vh] bg-[#fff8f0] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-6 flex items-center justify-center gap-2">
          <FaUserShield /> All Users
        </h2>

        {/* Total Count */}
        <p className="text-lg text-center text-gray-700 mb-8">
          Total Registered Users:{" "}
          <span className="text-green-700 font-bold">{users.length}</span>
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border shadow-md hover:shadow-xl rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaUser className="text-blue-500 text-xl" />
                <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                <FaUserTag className="inline-block mr-2 text-yellow-600" />
                <span className="font-medium">Email:</span> {user.email}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span>{" "}
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
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
    </div>
  );
};

export default AdminUsers;
