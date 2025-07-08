import { Link, useNavigate } from "react-router-dom"; // 🧠 Import useNavigate
import { useAuth } from "../context/AuthContext";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUserAlt,
  FaPizzaSlice,
  FaTachometerAlt,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // 🧠 Initialize

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();           // clear user context & cookies
    navigate("/");      // redirect to homepage
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to={isAdmin ? "/admin" : "/"}
          className="text-2xl font-extrabold text-red-500 flex items-center gap-2"
        >
          🍕 <span className="text-gray-800">PizzaVibe</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {isAdmin ? (
            <>
              <Link to="/admin" className="hover:text-red-500 transition flex items-center gap-1">
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link to="/admin/orders" className="hover:text-red-500 transition flex items-center gap-1">
                <FaClipboardList /> Orders
              </Link>
              <Link to="/admin/pizzas" className="hover:text-red-500 transition flex items-center gap-1">
                <FaPizzaSlice /> Pizzas
              </Link>
              <Link to="/admin/users" className="hover:text-red-500 transition flex items-center gap-1">
                <FaUserShield /> Users
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-red-500 transition">Home</Link>
              <Link to="/about" className="hover:text-red-500 transition">About</Link>
              <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
              {user && (
                <>
                  <Link to="/my-orders" className="hover:text-red-500 transition flex items-center gap-1">
                    <FaClipboardList /> Orders
                  </Link>
                  <Link to="/cart" className="hover:text-red-500 transition flex items-center gap-1">
                    <FaShoppingCart /> Cart
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:block text-gray-600">
                Hi, <span className="font-semibold">{user.fullName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-red-500 font-semibold transition flex items-center gap-1">
                <FaUserAlt /> Login
              </Link>
              <Link
                to="/register"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition flex items-center gap-2"
              >
                <FaUserAlt /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
