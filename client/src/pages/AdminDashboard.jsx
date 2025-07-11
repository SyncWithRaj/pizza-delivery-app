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
        toast.error("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  const cardStyle =
    "bg-white p-6 rounded-2xl border shadow-sm hover:shadow-2xl transform hover:scale-[1.03] transition duration-300 flex items-center gap-4";

  const titleStyle = "text-gray-500 text-sm uppercase";
  const valueStyle = "text-2xl font-bold text-gray-800";

  return (
    <div className="min-h-[90vh] bg-[#fff8f0] p-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex justify-center items-center gap-3">
          <FaUserShield className="text-red-500" /> Admin Dashboard
        </h2>

        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <FaClipboardList />,
              title: "Total Orders",
              value: stats.totalOrders,
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: <FaChartLine />,
              title: "Total Revenue",
              value: `₹${stats.totalRevenue}`,
              color: "from-green-400 to-green-600",
            },
            {
              icon: <FaClock />,
              title: "Pending Orders",
              value: stats.pendingOrders,
              color: "from-yellow-400 to-yellow-600",
            },
            {
              icon: <FaUsers />,
              title: "Total Users",
              value: stats.totalUsers,
              color: "from-purple-400 to-purple-600",
            },
            {
              icon: <FaPizzaSlice />,
              title: "Pizzas in Menu",
              value: stats.totalPizzas,
              color: "from-red-400 to-red-600",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-4"
            >
              <div
                className={`p-3 rounded-full bg-gradient-to-br ${item.color} text-white text-2xl shadow-md`}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                  {item.title}
                </div>
                <div className="text-3xl font-bold text-gray-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>


        {/* 🚀 Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaTasks /> Manage Orders
          </button>
          <button
            onClick={() => navigate("/admin/pizzas")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaPizzaSlice /> Manage Pizzas
          </button>
          <button
            onClick={() => navigate("/admin/ingredients")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaBoxes /> Manage Ingredients
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaUsers /> View Users
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaHome /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
