import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    FaBuilding,
    FaHome,
    FaCity,
    FaHotel,
    FaCloudUploadAlt, 
    FaTimes
} from "react-icons/fa";

const AddProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        furnishing: "",
        amenities: [],
        description: "",
    });

    const furnishingOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

    const amenitiesList = [
        "WiFi",
        "AC",
        "Parking",
        "Gym",
        "Swimming Pool",
        "Security",
        "Lift",
        "Pet Friendly",
    ];

    const [images, setImages] = useState([]);

    // Updated handleChange to properly handle numeric values
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        // For numeric fields, strip non-numeric characters
        if (name === "price" || name === "bedrooms" || name === "bathrooms" || name === "area") {
            // Remove all non-numeric characters
            const cleanValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: cleanValue === "" ? "" : Number(cleanValue),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Cleanup image URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            images.forEach(image => {
                if (image instanceof File) {
                    try {
                        URL.revokeObjectURL(URL.createObjectURL(image));
                    } catch (e) {
                        // Ignore errors
                    }
                }
            });
        };
    }, [images]);

    useEffect(() => {
        if (!id) return;

        const fetchProperty = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/property/${id}`
                );
                const property = data.property;
                setFormData({
                    title: property.title || "",
                    location: property.location || "",
                    price: property.price || "",
                    type: property.type || "",
                    bedrooms: property.bedrooms || "",
                    bathrooms: property.bathrooms || "",
                    area: property.area || "",
                    furnishing: property.furnishing || "",
                    amenities: property.amenities || [],
                    description: property.description || "",
                });
            } catch (error) {
                console.log(error);
                setError("Failed to fetch property data");
            }
        };

        fetchProperty();
    }, [id]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // Validate required fields
            if (!formData.title || !formData.location || !formData.price || !formData.type) {
                setError("Please fill in all required fields");
                setLoading(false);
                return;
            }

            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key !== "amenities") {
                    // Ensure numeric values are sent as numbers
                    if (key === "price" || key === "bedrooms" || key === "bathrooms" || key === "area") {
                        data.append(key, formData[key] || 0);
                    } else {
                        data.append(key, formData[key]);
                    }
                }
            });

            formData.amenities.forEach((amenity) => {
                data.append("amenities", amenity);
            });

            images.forEach((image) => {
                data.append("images", image);
            });

            if (id) {
                await axios.put(
                    `http://localhost:5000/api/property/edit/${id}`,
                    data,
                    {
                        withCredentials: true,
                    }
                );
                alert("Property Updated Successfully!");
            } else {
                await axios.post(
                    "http://localhost:5000/api/property/add",
                    data,
                    {
                        withCredentials: true,
                    }
                );
                alert("Property Added Successfully!");
            }

            navigate("/my-properties");

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to save property");
        } finally {
            setLoading(false);
        }
    };

    const propertyTypes = [
        { name: "Apartment", icon: <FaBuilding size={30} /> },
        { name: "Villa", icon: <FaHome size={30} /> },
        { name: "House", icon: <FaCity size={30} /> },
        { name: "Studio", icon: <FaHotel size={30} /> },
        { name: "Penthouse", icon: <FaBuilding size={30} /> },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-3xl mb-6">
                        {error}
                    </div>
                )}

                {/* Property Information */}
                <div className="bg-white rounded-[40px] shadow-xl p-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-10">
                        {id ? "Edit Property" : "Add Property"}
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-700 font-semibold">
                                Property Title *
                            </label>
                            <input
                                list="titles"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter or select title"
                                className="w-full mt-3 px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                disabled={loading}
                                required
                            />
                            <datalist id="titles">
                                <option value="Luxury Smart Villa" />
                                <option value="Modern 2BHK Apartment" />
                                <option value="Premium Family House" />
                                <option value="Cozy Studio Flat" />
                                <option value="Spacious Penthouse" />
                            </datalist>
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold">
                                City *
                            </label>
                            <input
                                list="cities"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter or select city"
                                className="w-full mt-3 px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                disabled={loading}
                                required
                            />
                            <datalist id="cities">
                                <option value="Bhopal" />
                                <option value="Delhi" />
                                <option value="Mumbai" />
                                <option value="Bangalore" />
                                <option value="Hyderabad" />
                                <option value="Chennai" />
                                <option value="Pune" />
                                <option value="Kolkata" />
                            </datalist>
                        </div>
                    </div>
                </div>

                {/* Property Type */}
                <div className="bg-white rounded-[40px] shadow-xl p-10 mt-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Property Type *
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {propertyTypes.map((type) => (
                            <div
                                key={type.name}
                                onClick={() => {
                                    if (!loading) {
                                        setFormData({
                                            ...formData,
                                            type: type.name
                                        });
                                    }
                                }}
                                className={`cursor-pointer rounded-3xl p-8 text-center transition duration-300
                                ${formData.type === type.name
                                        ? "bg-indigo-600 text-white shadow-2xl"
                                        : "bg-gray-50 hover:bg-indigo-50"
                                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <div className="flex justify-center mb-4">
                                    {type.icon}
                                </div>
                                <h3 className="font-semibold">
                                    {type.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing - Fixed */}
                <div className="bg-white rounded-[40px] shadow-xl p-10 mt-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Pricing *
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            placeholder="Monthly Rent (e.g., 20000)"
                            className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            disabled={loading}
                            inputMode="numeric"
                            required
                        />
                    </div>
                </div>

                {/* Features - Fixed */}
                <div className="bg-white rounded-[35px] shadow-xl p-8 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Features
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <label className="font-semibold text-gray-700">
                                Bedrooms
                            </label>
                            <input
                                type="text"
                                name="bedrooms"
                                value={formData.bedrooms || ''}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full mt-3 px-5 py-4 rounded-3xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={loading}
                                inputMode="numeric"
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-gray-700">
                                Bathrooms
                            </label>
                            <input
                                type="text"
                                name="bathrooms"
                                value={formData.bathrooms || ''}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full mt-3 px-5 py-4 rounded-3xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={loading}
                                inputMode="numeric"
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-gray-700">
                                Area (sq.ft)
                            </label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area || ''}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full mt-3 px-5 py-4 rounded-3xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={loading}
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                </div>

                {/* Furnishing */}
                <div className="bg-white rounded-[35px] shadow-xl p-8 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Furnishing
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {furnishingOptions.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    if (!loading) {
                                        setFormData({
                                            ...formData,
                                            furnishing: option,
                                        });
                                    }
                                }}
                                className={`cursor-pointer rounded-3xl p-8 text-center transition
                                ${formData.furnishing === option
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-50 hover:bg-indigo-50"
                                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-[35px] shadow-xl p-8 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Amenities
                    </h2>
                    <div className="grid md:grid-cols-4 gap-5">
                        {amenitiesList.map((amenity) => (
                            <label
                                key={amenity}
                                className={`bg-gray-50 hover:bg-indigo-50 rounded-3xl p-5 flex items-center gap-3 cursor-pointer
                                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.amenities.includes(amenity)}
                                    disabled={loading}
                                    onChange={() => {
                                        if (formData.amenities.includes(amenity)) {
                                            setFormData({
                                                ...formData,
                                                amenities: formData.amenities.filter(
                                                    item => item !== amenity
                                                )
                                            });
                                        } else {
                                            setFormData({
                                                ...formData,
                                                amenities: [
                                                    ...formData.amenities,
                                                    amenity
                                                ]
                                            });
                                        }
                                    }}
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-[35px] shadow-xl p-8 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Description
                    </h2>
                    <textarea
                        rows="6"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your property..."
                        className="w-full p-6 rounded-3xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={loading}
                    />
                </div>

                {/* Images */}
                <div className="bg-white rounded-[35px] shadow-xl p-10 mt-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Property Images
                    </h2>
                    <label className={`cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                        <div className="border-2 border-dashed border-indigo-300 rounded-[30px]
                            bg-linear-to-br from-indigo-50 to-purple-50
                            hover:border-indigo-500
                            transition duration-300 p-14 text-center">
                            <FaCloudUploadAlt
                                className="mx-auto text-6xl text-indigo-500 mb-5"
                            />
                            <h3 className="text-2xl font-bold text-gray-700">
                                Drag & Drop Images
                            </h3>
                            <p className="text-gray-500 mt-3">
                                or click to browse files
                            </p>
                            <div className="mt-5 inline-block bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                                Browse Files
                            </div>
                        </div>
                        <input
                            hidden
                            multiple
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={loading}
                        />
                    </label>

                    {images.length > 0 && (
                        <div className="bg-white rounded-[35px] shadow-xl p-10 mt-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                                Image Preview
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        {index === 0 && (
                                            <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                Cover Image
                                            </div>
                                        )}
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Property ${index + 1}`}
                                            className="h-52 w-full object-cover rounded-3xl shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            disabled={loading}
                                            className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-lg
                                            opacity-100 md:opacity-0 group-hover:opacity-100
                                            hover:bg-gray-100 transition"
                                        >
                                            <FaTimes className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-5 rounded-[30px]
                            bg-linear-to-r from-indigo-600 to-purple-600
                            text-white text-xl font-semibold
                            shadow-xl hover:shadow-2xl
                            hover:scale-[1.02]
                            transition duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {id ? "Updating..." : "Saving..."}
                            </span>
                        ) : (
                            id ? "Update Property" : "Save Property"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;