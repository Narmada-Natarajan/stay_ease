
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const MyProperties = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/property/my-properties",
        {
          withCredentials: true,
        }
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

  useEffect(() => {

    fetchMyProperties();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );

  }

  return (

    <div className="bg-gray-100 min-h-screen py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            My Properties
          </h1>

          <Link
            to="/add-property"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 transition"
          >
            <FaPlus />
            Add Property
          </Link>

        </div>

        {properties.length === 0 ? (

          <div className="text-center text-gray-500 text-xl mt-20">
            No properties added yet.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {properties.map((property) => (

              <div
                key={property._id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >

                <img
                  src={property.image}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-800">
                    {property.title}
                  </h2>

                  <div className="flex items-center mt-3 text-gray-500">

                    <FaMapMarkerAlt className="mr-2 text-indigo-600" />

                    {property.location}

                  </div>

                  <h3 className="text-3xl font-bold text-indigo-600 mt-6">
                    ₹{property.price}
                  </h3>

                  <div className="flex justify-between mt-8">

                    <Link
                      to={`/property/${property._id}`}
                      className="bg-indigo-600 text-white p-3 rounded-xl"
                    >
                      <FaEye />
                    </Link>

                    <button
                      className="bg-yellow-500 text-white p-3 rounded-xl"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="bg-red-500 text-white p-3 rounded-xl"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default MyProperties;
