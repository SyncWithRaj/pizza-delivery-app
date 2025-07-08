import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaChartLine,
  FaPizzaSlice,
  FaClipboardList,
  FaClock,
  FaHome,
  FaTasks,
  FaBoxes,
  FaUserShield,
} from "react-icons/fa";

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
        const res = await API.get("/admin/stats");
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  const cardStyle =
    "bg-white p-6 rounded-xl border shadow-md hover:shadow-xl transition flex items-center gap-4";

  const titleStyle = "text-gray-500 text-sm uppercase";
  const valueStyle = "text-2xl font-bold text-gray-800";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex justify-center items-center gap-2">
        <FaUserShield /> Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={cardStyle}>
          <FaClipboardList className="text-4xl text-blue-600" />
          <div>
            <div className={titleStyle}>Total Orders</div>
            <div className={valueStyle}>{stats.totalOrders}</div>
          </div>
        </div>
        <div className={cardStyle}>
          <FaChartLine className="text-4xl text-green-600" />
          <div>
            <div className={titleStyle}>Total Revenue</div>
            <div className={valueStyle}>₹{stats.totalRevenue}</div>
          </div>
        </div>
        <div className={cardStyle}>
          <FaClock className="text-4xl text-yellow-600" />
          <div>
            <div className={titleStyle}>Pending Orders</div>
            <div className={valueStyle}>{stats.pendingOrders}</div>
          </div>
        </div>
        <div className={cardStyle}>
          <FaUsers className="text-4xl text-purple-600" />
          <div>
            <div className={titleStyle}>Total Users</div>
            <div className={valueStyle}>{stats.totalUsers}</div>
          </div>
        </div>
        <div className={cardStyle}>
          <FaPizzaSlice className="text-4xl text-red-500" />
          <div>
            <div className={titleStyle}>Pizzas in Menu</div>
            <div className={valueStyle}>{stats.totalPizzas}</div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaTasks /> Manage Orders
        </button>
        <button
          onClick={() => navigate("/admin/pizzas")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaPizzaSlice /> Manage Pizzas
        </button>
        <button
          onClick={() => navigate("/admin/ingredients")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaBoxes /> Manage Ingredients
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaUsers /> View Users
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <FaHome /> Go to Home
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
