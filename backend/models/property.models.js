import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({


  title: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  area: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
  },

  furnishing: {
    type: String,
  },

  amenities: {
    type: [String],
  },

  image: {
    type: [String],
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
  {
    timestamps: true,
  }
);

export const Property = mongoose.model("Property", PropertySchema);