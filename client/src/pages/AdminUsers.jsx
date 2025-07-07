import { useEffect, useState } from "react";
import API from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // Make sure this is protected for admins
      setUsers(res.data.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👤 All Users</h2>
      {users.map((user) => (
        <div key={user._id} className="border p-4 rounded mb-2">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
