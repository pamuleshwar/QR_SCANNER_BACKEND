import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/QR_BARCODE_SCANNER");
    }catch(err){
        console.log(err.message);
        throw new Error("ERROR : " + err.message);
    }
}