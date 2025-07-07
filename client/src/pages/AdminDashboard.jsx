import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalPizzas: 0,
    pendingOrders: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats"); // 👈 Create this route
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  const cardStyle =
    "bg-white p-4 rounded shadow text-center border hover:shadow-lg transition";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🛠️ Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold">Total Revenue</h3>
          <p className="text-2xl">₹{stats.totalRevenue}</p>
        </div>
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold">Pending Orders</h3>
          <p className="text-2xl">{stats.pendingOrders}</p>
        </div>
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold">Pizzas in Menu</h3>
          <p className="text-2xl">{stats.totalPizzas}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Manage Orders
        </button>
        <button
          onClick={() => navigate("/admin/pizzas")}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Manage Pizzas
        </button>
        <button
          onClick={() => navigate("/admin/ingredients")}
          className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Manage Ingredients
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          View Users
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
