import express from "express";
import {User} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin=async (req,res)=>{

    try{

        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Details Missing"
            })
        }

        const userFound=await User.findOne({email});

        if(!userFound){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const passMatch=await bcrypt.compare(password,userFound.password);

        if(!passMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email id or password"
            })
        }

        const payload={
            email:userFound.email,
        };

        const token=jwt.sign(payload,process.env.JWTKEY,{
            expiresIn:"2d"
        }
        );
        
        return res.status(200).json({

            success:true,
            message:"Login Successfull",
            token

        })

    }
    catch(error){
        console.log(error.message);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }



}