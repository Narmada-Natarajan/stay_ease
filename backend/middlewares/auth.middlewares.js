import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const authMiddleware = async (req, res, next) => {

    console.log("Auth Middleware Hit");

    
    try {
        console.log("Header Cookie:", req.headers.cookie);
        console.log("Cookies:", req.cookies);


        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWTKEY);
        console.log("decoded:", decoded);



        const user = await User.findById(decoded.id);
        console.log("User:", user);
        

        if (!user) {
            return res.status(401).json({
                verified: false,
                message: "User no longer exists"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

