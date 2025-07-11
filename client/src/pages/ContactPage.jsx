import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-[#fff8f0] px-6 py-20 flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Left Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-red-600 flex items-center gap-3">
            <FaPaperPlane className="text-4xl animate-pulse" />
            Contact Us
          </h1>

          <p className="text-lg text-gray-700">
            Whether it's a topping suggestion or help with your order, we're just a message away!
          </p>

          <div className="space-y-4 mt-8">
            <ContactItem icon={<FaPhoneAlt />} text="+91 98765 43210" />
            <ContactItem icon={<FaEnvelope />} text="support@pizzavibe.com" />
            <ContactItem icon={<FaMapMarkerAlt />} text="Ahmedabad, Gujarat, India" />
          </div>

          <p className="text-sm text-gray-500 pt-4">
            We usually respond within a few hours. Your pizza happiness matters 🍕❤️
          </p>
        </motion.div>

        {/* Right Form Panel */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-md border space-y-5"
        >
          <InputField
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <InputField
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          <TextAreaField
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-full shadow-md transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-gray-700 text-base font-medium">
    <span className="text-red-500 text-xl">{icon}</span>
    {text}
  </div>
);

const InputField = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all shadow-sm"
    required
  />
);

const TextAreaField = ({ name, value, onChange, placeholder }) => (
  <textarea
    name={name}
    rows={4}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all shadow-sm resize-none"
    required
  />
);

export default Contact;
