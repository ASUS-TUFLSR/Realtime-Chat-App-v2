import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from "./lib/db.js";
import cors from 'cors'
import { app, server } from "./lib/socket.js"


dotenv.config();

const PORT = process.env.PORT

app.use(express.json()); // here express.json will help extract data from the body 
app.use(cookieParser());

app.use(cors({
   origin:"http://localhost:5173",
   credentials: true,
   methods: "GET,POST,PUT,DELETE", 
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})