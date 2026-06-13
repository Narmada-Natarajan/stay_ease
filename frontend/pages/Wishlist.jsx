
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaHeart,
} from "react-icons/fa";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {

        try {

            const { data } = await axios.get(
                "http://localhost:5000/api/wishlist/all",
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                setWishlist(data.wishlist);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);

    if (loading) {

        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Loading...
            </div>
        );

    }

    return (

        <div className="bg-gray-100 min-h-screen py-12 px-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800 mb-10">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaHeart className="text-red-500 text-2xl" />
                    </div>
                    <span>My Wishlist</span>
                </h1>

                {wishlist.length === 0 ? (

                    <div className="text-center text-gray-500 text-xl mt-20">
                        No saved properties yet.
                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {wishlist.map((item) => {

                            const property = item.property;

                            return (

                                <div
                                    key={property._id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                                >

                                    <img
                                        src={property.image?.[0]}
                                        className="h-64 w-full object-cover"
                                    />

                                    <div className="p-6">

                                        <div className="flex justify-between">

                                            <h2 className="text-xl font-bold text-gray-800">
                                                {property.title}
                                            </h2>

                                            <FaHeart className="text-red-500 text-xl" />

                                        </div>

                                        <div className="flex items-center mt-3 text-gray-500">
                                            <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                                            {property.location}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mt-5 text-gray-600">

                                            <div className="flex gap-2 items-center">
                                                <FaBed className="text-indigo-600" />
                                                {property.bedrooms}
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <FaBath className="text-indigo-600" />
                                                {property.bathrooms}
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <FaRulerCombined className="text-indigo-600" />
                                                {property.area}
                                            </div>

                                        </div>

                                        <div className="flex justify-between items-center mt-8">

                                            <div>

                                                <h2 className="text-2xl font-bold text-indigo-600">
                                                    ₹{property.price}
                                                </h2>

                                                <p className="text-gray-500 text-sm">
                                                    per month
                                                </p>

                                            </div>

                                            <Link
                                                to={`/property/${property._id}`}
                                                className="bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700 transition"
                                            >
                                                View Details
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

};

export default Wishlist;

