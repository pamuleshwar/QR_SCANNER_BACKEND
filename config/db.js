import mongoose from "mongoose";
import { DB_BASE_URL } from "../constants.js";

export const connectDB = async () => {
    try{
        await mongoose.connect(`${DB_BASE_URL}/QR_Scanner`);
    }catch(err){
        console.log(err.message);
        throw new Error("ERROR : " + err.message);
    }
}
