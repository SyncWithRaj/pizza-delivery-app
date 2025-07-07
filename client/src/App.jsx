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


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/customize" element={<CustomizePizza />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/pizzas" element={<AdminPizzas />} />
          <Route path="/admin/ingredients" element={<AdminIngredients />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
