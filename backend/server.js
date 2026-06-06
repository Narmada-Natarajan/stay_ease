import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import authRoutes from "./routers/auth.routers.js"
import cors  from "cors";
import propertyRoutes from "./routers/property.routers.js"
import cloudinary from "./config/cloudinary.config.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const server=express();
const PORT=process.env.PORT||5000;

//middlewares
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

server.use(cookieParser());

server.use(express.json());
server.use("/api/auth",authRoutes);
server.use("/api/property",propertyRoutes);


server.listen(PORT,()=>{
    console.log("Server is running on port", PORT);
});

