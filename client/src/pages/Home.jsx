import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally auto-redirect if needed
    if (!user) return;
    // Example: if you want to send admin to dashboard directly
    // if (user.role === "admin") navigate("/admin");
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">🍕 Welcome to Pizza Delivery App</h1>

      {!user ? (
        <>
          <p className="text-gray-500 text-lg">Please login or register to get started.</p>
          <div className="flex gap-4">
            <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl">Hello, <span className="font-semibold">{user.fullName || user.username}</span> 👋</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {user.role === "admin" ? (
              <Link to="/admin" className="bg-yellow-600 text-white px-4 py-2 rounded">Go to Admin Dashboard</Link>
            ) : (
              <>
                <Link to="/customize" className="bg-green-700 text-white px-4 py-2 rounded">Customize Your Pizza</Link>
                <Link to="/my-orders" className="bg-purple-700 text-white px-4 py-2 rounded">My Orders</Link>
              </>
            )}
            <Link to="/logout" className="bg-red-500 text-white px-4 py-2 rounded">Logout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
