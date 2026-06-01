import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const userReg = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const Userexists = await User.findOne({ email });

        if (Userexists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashpass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            password: hashpass
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}