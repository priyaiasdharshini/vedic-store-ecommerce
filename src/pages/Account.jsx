
// src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import api from "../utils/api"; // ✅ centralized axios instance

const Account = () => {
  const [user, setUser] = useState({
    name: "Your Name",
    email: "youremail@example.com",
  });
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");

  // tab state: 'profile' or 'orders'
  const [activeTab, setActiveTab] = useState("profile");

  // orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/profile");
        console.log(res.data)
        setUser(res.data);
      } catch (err) {
        setMsg("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // fetch orders when tab changes to orders
  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        try {
          setOrdersLoading(true);
          const res = await api.get("/orders"); // ✅ your endpoint
          setOrders(res.data.orders || []);
        } catch (err) {
          setMsg("Failed to load orders");
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setMsg("New password and confirm password do not match.");
    }
    try {
      const res = await api.post("/change-password", passwordData);
      setMsg(res.data.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "Password update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-green-600 font-semibold">
          Loading your account...
        </p>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 border border-green-100"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
          My Account
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-3">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg font-medium 
              ${
                activeTab === "profile"
                  ? "bg-[#f8b042] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium 
              ${
                activeTab === "orders"
                  ? "bg-[#f8b042] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            Order History
          </button>
        </div>

        {/* Profile & Password */}
        {activeTab === "profile" && (
          user ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Profile Info */}
              <div className="bg-green-50 rounded-xl p-5 shadow-sm border border-black">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Profile Information
                </h3>
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-[#f8b042] mr-2" />
                  <p className="text-gray-800 font-medium">{user.name}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[#f8b042] mr-2" />
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-green-50 rounded-xl p-5 shadow-sm border border-black">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Change Password
                </h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 border-gray-300"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 border-gray-300"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 border-gray-300"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full py-2 bg-[#f8b042] text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
                  >
                    Update Password
                  </motion.button>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 font-medium">
              Please login to view your account.
            </p>
          )
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="bg-green-50 rounded-xl p-5 shadow-sm border border-black">
            <h3 className="text-lg font-semibold text-black mb-3">
              Your Orders
            </h3>
            {ordersLoading ? (
              <p className="text-center text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-500">
                You haven’t placed any orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-[#f8b042] text-white">
                      <th className="py-2 px-3">Order ID</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 px-3">{order.id}</td>
                        <td className="py-2 px-3">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3">{order.status}</td>
                        <td className="py-2 px-3">₹{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Message */}
        {msg && (
          <p className="mt-6 text-center text-sm font-medium text-green-700">
            {msg}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Account;




