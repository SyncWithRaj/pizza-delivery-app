import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("Registering user...");
    await API.post("/auth/register", form);
    console.log("User registered, now fetching auth...");

    const { data } = await API.get("/auth/me");
    console.log("Fetched user:", data);
    setUser(data.data);

    navigate("/");
  } catch (err) {
    console.error(err); // <--- See full error in browser console
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      {["fullName", "username", "email", "password"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          type={field === "password" ? "password" : "text"}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      {/* Optional: Allow role only for testing */}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Register
      </button>
    </form>
  );
};

export default Register;
