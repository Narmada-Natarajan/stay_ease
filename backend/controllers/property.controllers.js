import { Property } from "../models/property.models.js";
import cloudinary from "../config/cloudinary.config.js";

export const getProperties=async(req,res)=>{

    try{

        const properties=await Property.find();

        return res.status(200).json({

            success:true,
            properties,
            
            
        });

    }catch(error){

        return res.status(500).json({

            success:false,
            message:error.message


        });
    }
};


export const getPropertyById = async (req, res) => {

    try {

        const property = await Property.findById(req.params.id);

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found"
            });

        }

        return res.status(200).json({

            success: true,
            property

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const getMyProperties = async (req, res) => {

    try {

        const properties = await Property.find({
            owner: req.user._id
        });

        return res.status(200).json({

            success: true,
            properties

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


export const editProperty = async (req, res) => {

    try {

        const property = await Property.findById(req.params.id);

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found"
            });

        }

        // Only the owner can edit
        if (property.owner.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        let imageUrls = property.image;

        // Upload new images if provided
        if (req.files && req.files.length > 0) {

            imageUrls = [];

            for (const file of req.files) {

                const result = await cloudinary.uploader.upload(file.path);

                imageUrls.push(result.secure_url);

            }

        }

        property.title = req.body.title;
        property.location = req.body.location;
        property.price = req.body.price;
        property.type = req.body.type;
        property.bedrooms = req.body.bedrooms;
        property.bathrooms = req.body.bathrooms;
        property.area = req.body.area;
        property.furnishing = req.body.furnishing;
        property.description = req.body.description;
        property.amenities = req.body.amenities;
        property.image = imageUrls;

        await property.save();

        return res.status(200).json({

            success: true,
            property

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
