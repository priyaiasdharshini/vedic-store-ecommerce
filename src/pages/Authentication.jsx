// src/pages/Authentication.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import api from "../utils/api"; // Axios instance with withCredentials

const Authentication = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (activeTab === "signup" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (activeTab === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (activeTab === "signup") {
        const res = await api.post("/api/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert(res.data.message);
        setActiveTab("login"); // switch to login after signup
      } else {
        const res = await api.post("/api/login", {
          email: formData.email,
          password: formData.password,
        });
        if (res.data.token) {
  localStorage.setItem("access", res.data.token);
}
        alert(res.data.message);
        // ✅ Redirect to account page after successful login
        navigate("/account");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function with automatic redirect
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/logout");
      alert(res.data.message || "Logged out successfully");
      // Clear form and state
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
      setActiveTab("login");
      // Redirect to login page after logout
      navigate("/auth");
    } catch (err) {
      alert("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-orange-100"
      >
        {/* Tabs */}
        <div className="flex justify-center mb-8 relative">
          <div className="flex bg-gray-100 rounded-xl p-1 w-full">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#f8b042] to-amber-500 text-white shadow"
                    : "text-gray-600"
                }`}
              >
                {tab === "login" ? "Login" : "Signup"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-orange-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-orange-400"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-orange-400"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          {activeTab === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-orange-400"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-[#f8b042] to-amber-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? activeTab === "login"
                ? "Logging in..."
                : "Signing up..."
              : activeTab === "login"
              ? "Login"
              : "Signup"}
          </motion.button>
        </form>

        {/* Logout button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Authentication;
