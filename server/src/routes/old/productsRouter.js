import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import productController from "../../controllers/productController.js";
import cloudinary from "../../utils/cloudinary.js";
import { ifLoggedIn, isLoggedIn } from "../middlewares/isLoggedIn.js";
const productsRouter = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // The folder in cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Allowed formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: transform images
  },
});

const upload = multer({ storage: storage });

// Get APIs for products
// productsRouter.get("/all-product", productController.getAllProduct);
// productsRouter.get("/product-by-category", productController.getProductByCategory,);
// productsRouter.get("/product-by-price", productController.getProductByPrice);

//Product Detail APIs
productsRouter.get( "/single-product", ifLoggedIn, productController.getProductById);
productsRouter.get(
  "/single-product/:id/reviews",
  ifLoggedIn,
  productController.getProductReviews,
);
productsRouter.get(
  "/single-product/:id/details",
  ifLoggedIn,
  productController.getProductById,
);

// Cart Items CRUD APIs
productsRouter.get(
  "/cart-product",
  isLoggedIn,
  productController.getCartProduct,
);
productsRouter.post(
  "/add-cart-product",
  isLoggedIn,
  productController.addCartProduct,
);
productsRouter.put(
  "/cartitem-quantity-update/:cartItemId",
  isLoggedIn,
  productController.updateCartItem,
);
productsRouter.delete(
  "/delete-cart-product/:cartItemId",
  isLoggedIn,
  productController.deleteCartProduct,
);

// Wishlist Add/Remove and Get APIs
productsRouter.get(
  "/wishlist-product",
  isLoggedIn,
  productController.getWishProduct,
);
productsRouter.post(
  "/toggle-wishlist-product",
  isLoggedIn,
  productController.toggleWishProduct,
);

// Review Create,Delete APIs
productsRouter.post("/add-review", isLoggedIn, productController.postAddReview);
productsRouter.delete(
  "/delete-review/:id",
  isLoggedIn,
  productController.deleteReview,
);

// Admin's APIs to CRUD Products
productsRouter.post(
  "/add-product",
  upload.any(),
  productController.postAddProduct,
);
productsRouter.post(
  "/edit-product",
  upload.any(),
  productController.postEditProduct,
);
productsRouter.delete(
  "/delete-product/:pId",
  productController.getDeleteProduct,
);

export { productsRouter };
