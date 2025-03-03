import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import  cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";


dotenv.config({});



const app = express();
const PORT = 8001;

//middleware
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
  origin:"http://localhost:5173",
  credentials:true
}
app.use(cors(corsOptions));


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`)
});