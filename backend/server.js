import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import authRoutes from "./routers/auth.routers.js"
import cors  from "cors";

dotenv.config();

connectDB();

const server=express();
const PORT=process.env.PORT||5000;

//middlewares
server.use(cors());

server.use(express.json());

server.use("/api/auth",authRoutes);

server.listen(PORT,()=>{
    console.log("Server is running on port", PORT);
});

