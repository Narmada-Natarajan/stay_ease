import { useState, useEffect, useRef } from "react";
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
  FaSearch,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";


const Home = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/property/all"
      );

      if (data.success) {
        setProperties(data.properties);
      }
      console.log(data.properties);

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
        console.log("Home checking auth");

        const { data } = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            withCredentials: true,
          }
        );

        console.log("ME RESPONSE:", data);

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
    fetchProperties();
  }, []);

  console.log(properties);

  const filteredProperties = properties.filter((property) => {

    const locationMatch =
      property.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

    const budgetMatch =
      searchBudget === "" ||
      property.price <= Number(searchBudget);

    return (
      locationMatch &&
      budgetMatch
    );

  });
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);
  return (


    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600"> Stay Ease </h1>
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home">Home</a> <a href="#properties">Properties</a>
            <a href="#features">Features</a> <a href="#contact">Contact</a>
          </div>
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-white shadow-lg px-4 py-2 rounded-full hover:shadow-xl transition"
            >
              <FaUserCircle className="text-3xl text-indigo-600" />

              <span className="font-medium text-gray-700">
                {user?.name}
              </span>

              <FaChevronDown
                className={`text-gray-500 transition duration-300 ${showDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showDropdown && (

              <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
                >
                  <FaUser className="text-indigo-600" />
                  Profile
                </Link>

                <Link
                  to="/my-properties"
                  className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
                >
                  <FaHome className="text-indigo-600" />
                  My Properties
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition"
                >
                  <FaHeart className="text-red-500" />
                  Wishlist
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            )}

          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center" >
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white"> Find Your Perfect <br /> Dream Home </h1>
          <p className="text-gray-200 mt-6 text-lg"> Modern • Secure • Affordable </p>
          <div className="mt-8 flex justify-center gap-4"> <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl"> Browse Homes </button>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-xl"> Learn More
            </button>
          </div>
          <div className="mt-14 flex justify-center gap-6">

            <div className="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl">
              <h2 className="text-3xl font-bold text-white">
                500+
              </h2>

              <p className="text-gray-200">
                Properties
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl">
              <h2 className="text-3xl font-bold text-white">
                1000+
              </h2>

              <p className="text-gray-200">
                Happy Renters
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-3xl">
              <h2 className="text-3xl font-bold text-white">
                50+
              </h2>

              <p className="text-gray-200">
                Cities
              </p>
            </div>

          </div>
        </div>

      </section>
      <section className="-mt-16 relative z-20 px-6">

        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-4 md:p-6 border border-gray-100">

          <div className="grid md:grid-cols-3 gap-5 items-end">

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <FaMapMarkerAlt className="text-indigo-500" />
                Location
              </label>



              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full mt-2 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-gray-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">All Cities</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>


            {/* Budget */}
            <div>

              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <FaMoneyBillWave className="text-indigo-500" />
                Budget
              </label>
              <select
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full mt-2 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-gray-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">Any Budget</option>
                <option value="10000">₹0 - ₹10,000</option>
                <option value="20000">₹10,000 - ₹20,000</option>
                <option value="30000">₹20,000 - ₹30,000</option>
                <option value="50000">₹30,000 - ₹50,000</option>
                <option value="100000">₹50,000+</option>
              </select>

            </div>


            {/* Search Button */}
            <div className="flex items-end">


              <button
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-xl text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaSearch />
                Search
              </button>

            </div>

          </div>

        </div>

      </section>

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

        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No Properties Found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02]transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={property.image?.[0]}
                    alt={property.title}
                    className="h-64 w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c";
                    }}
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
              Stay Ease
            </h2>

            <p className="text-gray-500 mt-4">
              Everything you need for a smooth rental experience.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
              <FaHome className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Smart Homes
              </h3>
              <p className="text-gray-500 mt-3">
                Modern properties with smart features.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
              <FaShieldAlt className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Secure Booking
              </h3>
              <p className="text-gray-500 mt-3">
                Safe and verified rental process.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
              <FaMapMarkerAlt className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg">
                Prime Locations
              </h3>
              <p className="text-gray-500 mt-3">
                Properties near key city areas.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
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
        className="bg-gray-900 text-gray-400 py-16"
      >

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-white text-3xl font-bold">
            Stay Ease
          </h2>

          <p className="mt-4">
            Find your dream home with comfort and elegance.
          </p>

          <div className="flex justify-center gap-8 mt-8">

            <a href="#home" className="hover:text-white">
              Home
            </a>

            <a href="#properties" className="hover:text-white">
              Properties
            </a>

            <a href="#features" className="hover:text-white">
              Features
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>

          </div>

          <p className="mt-10 text-sm">
            © 2026 Stay Ease. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;