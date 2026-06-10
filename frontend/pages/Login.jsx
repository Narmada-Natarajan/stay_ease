import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaShieldAlt,
} from "react-icons/fa";

import { FaMapMarkedAlt } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError(false)

    try {
      setLoading(true);

      const { data } = await axios.post("http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true
        }
      );

      if (data.success) {
        setError(false);
        setMessage(data.message || "Login Successful");

        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      setError(true);
      setMessage(
        error.response?.data?.message || "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

    <div className="w-full max-w-7xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="relative hidden lg:block">

        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1974&auto=format&fit=crop"
          alt="Villa"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-12">

           <div>
            <p className="text-5xl font-bold text-white mb-14">
              Stay Ease
            </p>

           
          </div>

          <div className="space-y-4 max-w-md">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex gap-5 items-center">

              <div className="bg-white/10 p-4 rounded-2xl">
                <FaHome className="text-2xl text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Luxury Living
                </h3>

                <p className="text-gray-200 mt-1">
                  Premium villas crafted for modern lifestyles.
                </p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex gap-5 items-center">

              <div className="bg-white/10 p-4 rounded-2xl">
                <FaShieldAlt className="text-2xl text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Secure Booking
                </h3>

                <p className="text-gray-200 mt-1">
                  Trusted owners and verified tenants.
                </p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex gap-5 items-center">

              <div className="bg-white/10 p-4 rounded-2xl">
                <FaMapMarkedAlt className="text-2xl text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Prime Locations
                </h3>

                <p className="text-gray-200 mt-1">
                  Find homes in the most desirable places.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="bg-gray-50 flex items-center justify-center px-10 py-12">

        <div className="w-full max-w-md">

          <h1 className="text-5xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Login to get your dream house
          </p>

          {message && (
            <div
              className={`mt-6 px-4 py-3 rounded-2xl text-sm font-medium ${
                error
                  ? "bg-red-50 border border-red-200 text-red-600"
                  : "bg-green-50 border border-green-200 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">

            {/* Email */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">

                <FaEnvelope className="text-gray-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent placeholder:text-[15px]"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">

                <FaLock className="text-gray-400 mr-3" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent placeholder:text-[15px]"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>

  </div>
);




};

export default Login;