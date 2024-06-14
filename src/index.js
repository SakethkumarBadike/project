//require("dotenv").config({path:'./env'});  //no code consistency 
import dotenv from "dotenv"; 
import connectDB from "./db/index.js";
dotenv.config({
    path:"./env"
});
connectDB();