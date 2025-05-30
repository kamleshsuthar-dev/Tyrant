import express from "express";
import multer from "multer";
import categoryController from "../controllers/categoriesController.js";
// import isLoggedIn  from "../middleware/isLoggedIn.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../utils/cloudinary.js";

const categoryRouter = express.Router();

// Image Upload setting
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'categories', // The folder in cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: transform images
  }
});

const upload = multer({ storage: storage });

categoryRouter.get("/all-category", categoryController.getAllCategory);
categoryRouter.post(
  "/add-category",
//   loginCheck,
  upload.single("cImage"),
  categoryController.postAddCategory
);
categoryRouter.post(
    "/edit-category", 
    // loginCheck, 
    upload.single('cImage'),
    categoryController.postEditCategory
);
categoryRouter.post(
  "/delete-category",
//   loginCheck,

  categoryController.getDeleteCategory
);

export default categoryRouter;
