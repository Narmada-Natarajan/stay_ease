import { Property } from "../models/property.models.js";
import cloudinary from "../config/cloudinary.config.js";

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      area,
      description,
    } = req.body;

    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    const property = await Property.create({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      area,
      description,
      image: result.secure_url,
      owner: req.user._id
    });

    return res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};