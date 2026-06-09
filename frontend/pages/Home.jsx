import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaHeart,
  FaStar,
} from "react-icons/fa";

const Home = () => {

  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/property/all"
      );

      if (data.success) {
        setProperties(data.properties);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
   const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          withCredentials: true,
        }
      );

      if (data.verified) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  checkAuth();
}, []);
  

  return (


    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            Stay Ease
          </h1>
          

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home">Home</a>
            <a href="#properties">Properties</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="flex gap-3">
  {user ? (
   <button
  onClick={handleLogout}
  className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
>
  Logout
</button>
  ) : (
    <>
      <Link
        to="/login"
        className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Register
      </Link>
    </>
  )}
</div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center"
      >
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
          alt="home"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Find Your Perfect
            <br />
            Dream Home
          </h1>

          <p className="text-gray-200 mt-6 text-lg max-w-2xl mx-auto">
            Discover modern, secure, and affordable rental homes
            tailored to your lifestyle.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              Browse Homes
            </button>

            <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
      {loading ? (
        <p className="text-center text-gray-500 text-lg">
          Loading Properties...
        </p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No Properties Found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* map here */}
        </div>
      )}

      {/* Featured Properties */}
      <section
        id="properties"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Properties
          </h2>

          <p className="text-gray-500 mt-4">
            Explore our most popular smart homes.
          </p>
        </div>

        {properties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No Properties Found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-64 w-full object-cover"
                  />

                  <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:text-red-500 transition">
                    <FaHeart />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="text-sm font-medium text-gray-700">
                        4.8
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mt-3 text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                    {property.location}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-5 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-indigo-600" />
                      <span>{property.bedrooms}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaBath className="text-indigo-600" />
                      <span>{property.bathrooms}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaRulerCombined className="text-indigo-600" />
                      <span>{property.area} sq.ft</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {property.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <h4 className="text-2xl font-bold text-indigo-600">
                        ₹{property.price}
                      </h4>

                      <p className="text-sm text-gray-500">
                        per month
                      </p>
                    </div>

                    <Link
                      to={`/property/${property._id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-gray-50 py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose Us?
            </h2>

            <p className="text-gray-500 mt-4">
              Everything you need for a smooth rental experience.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow">
              <FaHome className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Smart Homes
              </h3>
              <p className="text-gray-500 mt-3">
                Modern properties with smart features.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow">
              <FaShieldAlt className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Secure Booking
              </h3>
              <p className="text-gray-500 mt-3">
                Safe and verified rental process.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow">
              <FaMapMarkerAlt className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Prime Locations
              </h3>
              <p className="text-gray-500 mt-3">
                Properties near key city areas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow">
              <FaMoneyBillWave className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Affordable Pricing
              </h3>
              <p className="text-gray-500 mt-3">
                Homes that fit every budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-24 text-center px-6">
        <h2 className="text-4xl font-bold">
          Ready to Find Your Dream Home?
        </h2>

        <p className="mt-4 text-indigo-100">
          Join thousands of happy renters today.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-400 py-10 text-center"
      >
        <h3 className="text-white text-2xl font-bold mb-3">
          Stay Ease
        </h3>

        <p>
          © 2026 Stay Ease. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;