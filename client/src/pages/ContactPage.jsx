import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const SERVICE_ID = "service_rhq5gwz";
const TEMPLATE_ID = "template_7pe0vqf";
const PUBLIC_KEY = "jCu1SQ93ZzjrPbL4O";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10 flex items-center justify-center gap-2">
        <FaPaperPlane /> Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-xl text-red-500" />
            <span className="text-gray-700 font-medium">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-xl text-red-500" />
            <span className="text-gray-700 font-medium">support@pizzavibe.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-xl text-red-500" />
            <span className="text-gray-700 font-medium">Ahmedabad, Gujarat, India</span>
          </div>

          <p className="text-sm text-gray-500 pt-6">
            We're here to help you with any questions or issues related to your orders, ingredients, or your custom pizzas.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-6 rounded-xl space-y-4 border"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
