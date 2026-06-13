import { Property } from "../models/property.models.js";

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
