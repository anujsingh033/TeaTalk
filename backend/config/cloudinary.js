import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uploadToCloudinary = async (filePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    try {
        if (!filePath) {
            return null;
        }
        let uploadFile = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return uploadFile.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log("Cloudinary Error", error)

    }
};

export default uploadToCloudinary;