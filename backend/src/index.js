import express from "express"
import authRoutes from "./routes/authRoutes.js"
import dotenv from 'dotenv'
import { connectDB } from "./lib/db.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()) // here express.json will help extract data from the body 

app.use("/api/auth", authRoutes);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
})