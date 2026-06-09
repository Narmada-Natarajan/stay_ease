import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Image Section */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
            alt="house"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 p-12 flex flex-col justify-between text-white">
            <div>
              <h1 className="text-5xl font-bold">Stay Ease</h1>

              <p className="mt-4 text-lg text-gray-200">
                Find your dream home with comfort and style.
              </p>
            </div>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <FaHome size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Modern Homes</h3>
                  <p className="text-sm text-gray-200">
                    Luxury spaces designed for comfort.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <FaShieldAlt size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Secure Booking</h3>
                  <p className="text-sm text-gray-200">
                    Trusted and verified properties.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <FaMapMarkerAlt size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Prime Locations</h3>
                  <p className="text-sm text-gray-200">
                    Homes in the best neighborhoods.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-gray-50 flex items-center justify-center px-8 py-12">

          <div className="w-full max-w-md">

            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3">
              Login to continue your journey.
            </p>

            <form className="mt-10 space-y-6">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="mt-2 bg-white border rounded-2xl flex items-center px-5 py-4">
                  <FaEnvelope className="text-gray-400 mr-3" />

                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="mt-2 bg-white border rounded-2xl flex items-center px-5 py-4">
                  <FaLock className="text-gray-400 mr-3" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full outline-none bg-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition
                duration-300
                hover:scale-[1.02]
                "
              >
                Login
              </button>

            </form>

            <p className="text-center mt-8 text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold"
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

