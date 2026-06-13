
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaStar,
  FaWifi,
  FaCar,
  FaShieldAlt,
  FaLeaf,
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaHeart
} from "react-icons/fa";

const Propertydetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const nextImage = () => {

      setCurrentImage(
        (prev) => (prev + 1) % property.image.length
      );

    };

    const prevImage = () => {

      setCurrentImage(
        (prev) =>
          prev === 0
            ? property.image.length - 1
            : prev - 1
      );

    };

    const fetchProperty = async () => {

      try {

        const { data } = await axios.get(
          `http://localhost:5000/api/property/${id}`
        );

        if (data.success) {
          setProperty(data.property);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

    fetchProperty();

  }, [id]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  }

  return (


    <div className="bg-gray-100 min-h-screen py-10 px-6">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Image */}



        <div className="overflow-hidden rounded-3xl">

          <div className="grid grid-cols-4 gap-2 h-125">

            {/* Main Image */}
            <div className="col-span-2 row-span-2 overflow-hidden">

              <img
                src={property.image?.[0]}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

            </div>


            {/* Top Right */}
            <div className="overflow-hidden">

              <img
                src={property.image?.[1]}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

            </div>


            {/* Top Right 2 */}
            <div className="overflow-hidden">

              <img
                src={property.image?.[2]}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

            </div>


            {/* Bottom Right */}
            <div className="overflow-hidden">

              <img
                src={property.image?.[3]}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

            </div>


            {/* Last Image */}
            <div className="relative overflow-hidden">

              <img
                src={property.image?.[4]}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

              <button
                onClick={() => setShowGallery(true)}
                className="absolute bottom-3 right-3 z-10 bg-white px-4 py-2 rounded-2xl shadow-lg font-medium hover:bg-gray-100 transition"
              >
                View All Photos
              </button>

            </div>

          </div>

        </div>




        <div className="p-10">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                {property.title}
              </h1>

              <div className="flex items-center mt-4 text-gray-500">

                <FaMapMarkerAlt className="mr-2 text-indigo-600" />

                {property.location}

              </div>

            </div>

            <div className="flex items-center gap-2 text-yellow-500">

              <FaStar />

              <span className="text-lg font-semibold text-gray-700">
                4.8
              </span>

            </div>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-4">

              <FaBed className="text-3xl text-indigo-600" />

              <div>

                <h3 className="font-bold text-xl">
                  {property.bedrooms}
                </h3>

                <p className="text-gray-500">
                  Bedrooms
                </p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-4">

              <FaBath className="text-3xl text-indigo-600" />

              <div>

                <h3 className="font-bold text-xl">
                  {property.bathrooms}
                </h3>

                <p className="text-gray-500">
                  Bathrooms
                </p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-4">

              <FaRulerCombined className="text-3xl text-indigo-600" />

              <div>

                <h3 className="font-bold text-xl">
                  {property.area}
                </h3>

                <p className="text-gray-500">
                  sq.ft
                </p>

              </div>

            </div>

          </div>

          {/* Price */}

          <div className="mt-10">

            <h2 className="text-4xl font-bold text-indigo-600">

              ₹{property.price}

            </h2>

            <p className="text-gray-500">

              per month

            </p>

          </div>

          {/* Description */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">

              Description

            </h2>

            <p className="text-gray-600 leading-8">
              {property.description}

              <br /><br />

              Experience luxury living in this beautifully designed property located in a prime area. Featuring spacious rooms, elegant interiors, modern amenities, and a peaceful environment, this home offers the perfect blend of comfort and convenience.



              Close to schools, hospitals, shopping centers and public transport, making it ideal for families and professionals seeking a secure and premium lifestyle.
            </p>

          </div>
          <div className="mt-14">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Amenities
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <div className="bg-gray-50 rounded-3xl p-5 flex items-center gap-3">
                <FaWifi className="text-indigo-600 text-2xl" />
                WiFi
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 flex items-center gap-3">
                <FaCar className="text-indigo-600 text-2xl" />
                Parking
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 flex items-center gap-3">
                <FaShieldAlt className="text-indigo-600 text-2xl" />
                Security
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 flex items-center gap-3">
                <FaLeaf className="text-indigo-600 text-2xl" />
                Garden
              </div>

            </div>

          </div>

          <div className="mt-16">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Property Owner
            </h2>

            <div className="bg-gray-50 rounded-3xl p-8 shadow-md">

              <div className="flex items-center gap-5">

                <FaUserCircle className="text-6xl text-indigo-600" />

                <div>

                  <h3 className="text-2xl font-bold">
                    Rajesh Sharma
                  </h3>

                  <p className="text-gray-500">
                    Verified Owner
                  </p>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <FaEnvelope className="text-indigo-600" />

                  rajesh.sharma@gmail.com

                </div>

                <div className="flex items-center gap-3">

                  <FaPhoneAlt className="text-indigo-600" />

                  +91 99910 11610

                </div>

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-green-500" />

                  Member since 2023

                </div>

              </div>

            </div>

          </div>

          {/* Button */}

          <div className="mt-14 flex gap-5">

            <button className="bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 px-10 py-4 rounded-2xl flex items-center gap-3 transition">

              <FaHeart />

              Save Property

            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition">

              Book Now

            </button>

          </div>

        </div>

      </div>


      {
        showGallery && (

          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">

            {/* Top Bar */}

            <div className="flex justify-between items-center p-6">

              <h2 className="text-white text-2xl font-bold">
                Property Photos
              </h2>

              <button
                onClick={() => setShowGallery(false)}
                className="text-white text-5xl"
              >
                ×
              </button>

            </div>


            {/* Main Image */}

            <div className="flex-1 flex items-center justify-center relative">

              <button
                onClick={prevImage}
                className="absolute left-8 bg-white p-4 rounded-full shadow-xl"
              >
                ←
              </button>


              <img
                src={property.image?.[currentImage]}
                className="max-w-[90%] max-h-[80vh] object-contain rounded-3xl shadow-2xl"
              />


              <button
                onClick={nextImage}
                className="absolute right-8 bg-white p-4 rounded-full shadow-xl"
              >
                →
              </button>

            </div>


            {/* Thumbnail Strip */}

            <div className="flex justify-center gap-4 pb-8 overflow-x-auto px-6">

              {property.image?.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  onClick={() => setCurrentImage(index)}
                  className={`w-28 h-20 object-cover rounded-2xl cursor-pointer border-4 transition

        ${currentImage === index
                      ? "border-indigo-500"
                      : "border-transparent"
                    }
        `}
                />

              ))}

            </div>

          </div>

        )
      }





    </div>



  );

};

export default Propertydetails;

