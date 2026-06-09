import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const Protectedroute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("ProtectedRoute checking auth");

        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            withCredentials: true,
          }
        );

        if (response.data.verified) {
          setUser(response.data.user);
          setIsLoggedIn(true);      // ← MISSING
        } else {
          setIsLoggedIn(false);
        }

      } catch (error) {
        console.log("Auth Error:", error.response?.data);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protectedroute;