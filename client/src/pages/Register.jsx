import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md mt-20 space-y-4">
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
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
    </form>
  );
};

export default Register;
