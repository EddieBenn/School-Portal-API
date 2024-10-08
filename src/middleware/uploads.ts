import { Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, // Removed backticks and curly braces
  api_key: process.env.API_KEY, // Removed backticks and curly braces
  api_secret: process.env.API_SECRET, // Removed backticks and curly braces
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "Student_Created_Upload"
    };
  },
});

const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "Course_Created_Upload"
      };
    },
  });

export const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .webp and .jpeg format allowed!"));
    }
  },
});

export const upload2 = multer({
    storage: storage2,
    fileFilter: (req: Request, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/webp"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg, .webp and .jpeg format allowed!"));
      }
    },
  });