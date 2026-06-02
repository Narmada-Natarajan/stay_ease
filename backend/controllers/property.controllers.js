import { Property } from "../models/property.models.js";

export const getProperties=async()=>{

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
