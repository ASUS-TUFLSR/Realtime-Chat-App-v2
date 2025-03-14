import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from "./lib/db.js";
import cors from 'cors'



dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()); // here express.json will help extract data from the body 
app.use(cookieParser());
app.use(cors({
   origin:"http://localhost:5173",
   credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})