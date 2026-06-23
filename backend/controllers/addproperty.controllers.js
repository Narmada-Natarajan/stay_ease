import { Property } from "../models/property.models.js";
import cloudinary from "../config/cloudinary.config.js";


export const addProperty = async (req, res) => {
  try {

    if (req.user.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only owners can add properties"
      });
    }

    const { title, location, price, bedrooms, bathrooms, area, description, type, furnishing, amenities, } = req.body;

    const imageUrls = [];

    for (const file of req.files) {

      const result = await cloudinary.uploader.upload(
        file.path
      );

      imageUrls.push(result.secure_url);

    }

    const property = await Property.create({
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
    type,
    furnishing,
    amenities,
    image: imageUrls,
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

export const deleteProperty = async (req, res) => {

    try {

        await Property.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true
        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const editProperty = async (req, res) => {

  try {

    const property = await Property.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    );

    res.status(200).json({

      success: true,
      property

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};

