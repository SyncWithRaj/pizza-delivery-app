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
  FaEnvelope
} from "react-icons/fa";
import toast from "react-hot-toast"; // 🧠 Make sure this is imported



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout(); // from AuthContext
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Logout failed!");
    }
  };
  const isAdmin = user?.role === "admin";

  

  return (
    <nav className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full px-6 py-4 sticky top-4 z-50 mx-4 border border-gray-200">

      <div className="max-w-full mx-auto flex justify-around items-center">
        {/* Logo (with Icon) */}
        <Link
          to={isAdmin ? "/admin" : "/"}
          className="text-2xl font-extrabold text-red-600 flex items-center gap-2"
        >
          <img
            src="/images/logo.png"
            alt="PizzaScript Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-gray-800 tracking-tight text-3xl">PizzaScript</span>
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
              <Link to="/" className="hover:text-red-500 transition flex items-center gap-1">
                <FaHome /> Home
              </Link>
              <Link to="/about" className="hover:text-red-500 transition flex items-center gap-1">
                <FaInfoCircle /> About
              </Link>
              <Link to="/contact" className="hover:text-red-500 transition flex items-center gap-1">
                <FaEnvelope /> Contact
              </Link>

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

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:block text-gray-600">
                Hi,{" "}
                <Link
                  to="/profile"
                  className="font-semibold text-red-500 hover:underline transition"
                >
                  {user.fullName}
                </Link>
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
