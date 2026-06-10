import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaShieldAlt,FaKey
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "tenant",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      if (data.success) {
        setError(false);
        setMessage(data.message || "Registration Successful");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="h-50vh bg-slate-80 flex items-center justify-center p-3">

    <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid md:grid-cols-2">

      {/* Left Side */}
      <div className="relative hidden lg:block">

        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1974&auto=format&fit=crop"
          alt="Villa"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8">

          <div className="space-y-2 max-w-sm">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-3 flex gap-4 items-center">

              <div className="bg-white/10 p-1 rounded-2xl">
                <FaHome className="text-xl text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-lg text-white">
                  Luxury Living
                </h3>

                <p className="text-gray-200 text-sm">
                  Premium homes.
                </p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-3 flex gap-4 items-center">

              <div className="bg-white/10 p-1 rounded-2xl">
                <FaShieldAlt className="text-xl text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-lg text-white">
                  Secure Platform
                </h3>

                <p className="text-gray-200 text-sm">
                  Trusted rentals.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Right Side */}
      <div className="bg-gray-50 flex items-center justify-center px-2 py-1">

        <div className="w-full max-w-md">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join Stay Ease today
          </p>

          {message && (
            <div
              className={`mt-4 px-4 py-3 rounded-2xl text-sm font-medium ${
                error
                  ? "bg-red-50 border border-red-200 text-red-600"
                  : "bg-green-50 border border-green-200 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            {/* Name */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">

                <FaUser className="text-gray-400 mr-3" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full outline-none placeholder:text-[15px]"
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">

                <FaEnvelope className="text-gray-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none placeholder:text-[15px]"
                  required
                />

              </div>

            </div>


            {/* Role */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                I am a
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "tenant",
                    })
                  }
                  className={`rounded-2xl p-3 border transition ${
                    formData.role === "tenant"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white"
                  }`}
                >
                  <div className="text-base font-semibold">
                    <FaKey className="text-xl mb-1 mx-auto" />
                    Tenant
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "owner",
                    })
                  }
                  className={`rounded-2xl p-3 border transition ${
                    formData.role === "owner"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white"
                  }`}
                >
                  <div className="text-base font-semibold">
                    <FaHome className="text-xl mb-1 mx-auto" />
                    Owner
                  </div>
                </button>

              </div>

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">

                <FaLock className="text-gray-400 mr-3" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none placeholder:text-[15px]"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Confirm Password
              </label>

              <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">

                <FaLock className="text-gray-400 mr-3" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none placeholder:text-[15px]"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>

  </div>
);




};

export default Register;


