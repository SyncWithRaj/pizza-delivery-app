import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Logout from "./pages/Logout";
import CustomizePizza from "./pages/CustomizePizza";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminPizzas from "./pages/AdminPizzas";
import AdminIngredients from "./pages/AdminIngredients";
import AdminUsers from "./pages/AdminUsers";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage"; // adjust if needed
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateProfile from "./pages/UpdateProfile";
import LoginWithOtp from "./pages/LoginWithOtp";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-otp" element={<LoginWithOtp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/customize" element={<CustomizePizza />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/pizzas" element={<AdminPizzas />} />
          <Route path="/admin/ingredients" element={<AdminIngredients />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />

        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
