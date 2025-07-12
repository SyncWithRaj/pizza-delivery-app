import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'pizza_ingredients', // optional
    });

    fs.unlinkSync(localFilePath); // cleanup local file
    return result; // contains secure_url
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
