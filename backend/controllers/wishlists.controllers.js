
import { wish } from "../models/wishlists.models.js";

export const toggleWishlist = async (req, res) => {

  try {

    const userId = req.user._id;
    const { propertyId } = req.body;

    const existing = await wish.findOne({
      user: userId,
      property: propertyId,
    });

    if (existing) {

      await wish.findByIdAndDelete(existing._id);

      return res.json({
        success: true,
        message: "Removed from wishlist",
      });

    }

    await wish.create({
      user: userId,
      property: propertyId,
    });

    res.json({
      success: true,
      message: "Added to wishlist",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const getWishlist = async (req, res) => {

  try {

    const wishlist = await wish.find({
      user: req.user._id,
    }).populate("property");

    res.json({
      success: true,
      wishlist,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


