// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api"; // your axios instance with interceptors

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(false); //true
  const [isAuthenticated, setIsAuthenticated] = useState(true); //false

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/profile/"); // Django session auth
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    // checkAuth();
  }, []);

  if (loading) return <p className="text-center mt-10">Checking authentication...</p>;

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
