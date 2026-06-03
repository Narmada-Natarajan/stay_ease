import { Property } from "../models/property.models.js";

export const addProperty=async(req,res)=>{

    try{

        const addHome=await Property.create(req.body);

        return res.status(200).json({

            success:true,
            message:"Property added successfully",
            Property:addHome,

        });

    }catch(error){

        return res.status(500).json({

            success:false,
            message:error.message
        });
    }
};