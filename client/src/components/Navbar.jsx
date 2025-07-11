import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUserAlt,
  FaPizzaSlice,
  FaTachometerAlt,
  FaClipboardList,
  FaUserShield,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="sticky top-4 z-50 mx-4 bg-white/70 backdrop-blur-lg shadow-lg border border-gray-200 rounded-full px-6 py-4">
      <div className="max-w-full mx-auto flex justify-around items-center">
        {/* Logo */}
        <Link
          to={isAdmin ? "/admin" : "/"}
          className="text-2xl font-extrabold text-red-600 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-gray-800 text-3xl">PizzaScript</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          {isAdmin ? (
            <>
              <NavLink to="/admin" icon={<FaTachometerAlt />} text="Dashboard" />
              <NavLink to="/admin/orders" icon={<FaClipboardList />} text="Orders" />
              <NavLink to="/admin/pizzas" icon={<FaPizzaSlice />} text="Pizzas" />
              <NavLink to="/admin/users" icon={<FaUserShield />} text="Users" />
            </>
          ) : (
            <>
              <NavLink to="/" icon={<FaHome />} text="Home" />
              <NavLink to="/about" icon={<FaInfoCircle />} text="About" />
              <NavLink to="/contact" icon={<FaEnvelope />} text="Contact" />
              {user && (
                <>
                  <NavLink to="/my-orders" icon={<FaClipboardList />} text="Orders" />
                  <NavLink to="/cart" icon={<FaShoppingCart />} text="Cart" />
                </>
              )}
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="hidden md:block text-gray-600">
                Hi,{" "}
                <Link
                  to="/profile"
                  className="font-semibold text-red-500 hover:underline"
                >
                  {user.fullName}
                </Link>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition hover:scale-105"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-500 font-semibold flex items-center gap-1 transition"
              >
                <FaUserAlt /> Login
              </Link>
              <Link
                to="/register"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition hover:scale-105"
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

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-red-500 transition-all duration-200 hover:scale-105"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
