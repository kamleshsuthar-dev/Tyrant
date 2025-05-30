import productModel from "../models/product.models.js";
import categoryModel from "../models/categories.models.js";
import mongoose from "mongoose";
import { deleteImage, deleteImages } from "./cloudinary.js";
import cartItemModels from "../models/cartItem.models.js";
import userModels from "../models/user.models.js";
import productReviewModels from "../models/productReview.models.js";
import { updateProductRating } from "../utils/updateRating.js";
import { redis } from "../config/redis.js";

class Product {
  async getAllProduct(req, res) {
    try {
      const Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Products) {
        return res.json({ Products });
      }
      return res.json({ message: "No products found" });
    } catch (err) {
      console.error(err);
    }
  }
  async postAddProduct(req, res) {
    const {
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
    } = req.body;
    const images = req.files;
    if (
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      await deleteImages(images);
      return res.json({ error: "All fields must be required" });
    } else if (pName.length > 255 || pDescription.length > 3000) {
      await deleteImages(images);
      return res.json({
        error: "Name 255 & Description must not be 3000 characters long",
      });
    }
    // else if (images.length !== 2) {
    //       Product.deleteImages(images, "file");
    //       return res.json({ error: "Must provide 2 images" });
    //     }
    else {
      try {
        let existingCategory = await categoryModel.findById(pCategory);
        if (!existingCategory) {
          await deleteImages(images);
          return res.json({ error: "Category does not exist" });
        }
        const allImages = images.map((img) => ({
          ImageName: img.filename,
          URL: img.path,
        }));
        const newProduct = new productModel({
          pImages: allImages,
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pCategory,
          pOffer,
          pStatus,
        });
        const save = await newProduct.save();
        await categoryModel.findByIdAndUpdate(pCategory, {
          $push: { cProducts: newProduct._id },
        });
        if (save) {
          return res.json({ success: "Product created successfully" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  async postEditProduct(req, res) {
    const {
      pId,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      imagesToDelete,
    } = req.body;
    const newImages = req.files;
    if (
      !pId ||
      !pName ||
      !pDescription ||
      !pPrice ||
      !pQuantity ||
      !pCategory ||
      !pOffer ||
      !pStatus
    ) {
      if (newImages) await deleteImages(newImages);
      return res.json({ error: "All fields must be required" });
    }
    if (pName.length > 255 || pDescription.length > 3000) {
      await deleteImages(newImages);
      return res.json({
        error: "Name 255 & Description must not be 3000 characters long",
      });
    }
    //  else if (editImages && editImages.length === 1) {
    //       Product.deleteImages(editImages, "file");
    //       return res.json({ error: "Must provide 2 images" });
    //     }

    try {
      const existingProduct = await productModel.findById(pId);
      const existingCategory = await categoryModel.findById(pCategory);

      if (!existingProduct) {
        await deleteImages(newImages);
        return res.json({ error: "Product not found" });
      } else if (!existingCategory) {
        await deleteImages(newImages);
        return res.json({ error: "Category does not exist" });
      }
      let updatedImages = [...existingProduct.pImages];

      if (imagesToDelete && imagesToDelete.length > 0) {
        const imagesToKeep = updatedImages.filter(
          (img) => !imagesToDelete.includes(img.ImageName)
        );
        const deletedImages = updatedImages.filter((img) =>
          imagesToDelete.includes(img.ImageName)
        );

        await deleteImages(
          deletedImages.map((img) => ({
            filename: img.ImageName,
            path: img.URL,
          }))
        );

        updatedImages = imagesToKeep;
      }

      if (newImages && newImages.length > 0) {
        const additionalImages = newImages.map((img) => ({
          ImageName: img.filename,
          URL: img.path,
        }));
        updatedImages = [...updatedImages, ...additionalImages];
      }

      const updateData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
        pImages: updatedImages,
      };

      const updatedProduct = await productModel.findByIdAndUpdate(
        pId,
        updateData,
        { new: true }
      );

      if (existingProduct.pCategory.toString() !== pCategory) {
        await categoryModel.findByIdAndUpdate(existingProduct.pCategory, {
          $pull: { cProducts: pId },
        });
        await categoryModel.findByIdAndUpdate(pCategory, {
          $push: { cProducts: pId },
        });
      }

      return res.json({
        success: "Product updated successfully",
        updatedImageCount: updatedImages.length,
      });
    } catch (error) {
      console.error(error);
      await deleteImages(newImages);
      return res.json({ error: "Something went wrong" });
    }
  }
  async getDeleteProduct(req, res) {
    try {
      const { pId } = req.params;
      if (!pId) {
        return res.json({ error: "Product Id is required" });
      } else if (!(await productModel.findById(pId))) {
        return res.json({ error: "Product not found" });
      } else {
        const deleteProduct = await productModel.findByIdAndDelete(pId);

        if (deleteProduct) {
          deleteProduct.pImages.forEach((img) => {
            deleteImage(img.ImageName);
          });
          return res.json({
            success: true,
            message: "Product deleted successfully",
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.json({ error: "Error deleting product" });
    }
  }
  async getProductByCategory(req, res) {
    try {
      const cId = req.query.cId;
      if (!cId || !mongoose.isValidObjectId(cId)) {
        return res
          .status(400)
          .json({ error: "Invalid or missing Category Id" });
      }
      const cacheKey = `categoryProducts:${cId}`;
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log("📦 Served from Redis cache");
        return res.status(200).json({ products: JSON.parse(cachedData) });
      }
      const products = await productModel
        .find({ pCategory: cId })
        .select(
          "pName pDescription pPrice pImages pOffer pStatus avgRating reviewCount"
        )
        .lean();
      if (!products.length) {
        return res
          .status(404)
          .json({ message: "No products found for this category" });
      }
      await redis.setex(cacheKey, 3600, JSON.stringify(products));
      console.log("🧠 Stored in Redis cache");
      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getProductByPrice(req, res) {
    try {
      const { cId, order } = req.query;
      if (!cId || !mongoose.isValidObjectId(cId)) {
        return res
          .status(400)
          .json({ error: "Category Id is missing or invalid" });
      }

      const products = await productModel
        .find({ pCategory: cId })
        .sort({ pPrice: Number(order) });

      return res.json({ products });
    } catch (error) {
      console.error(error);
      return res.json({ error: "Something went wrong" });
    }
  }
  async getProductById(req, res) {
    try {
      const userId = req.user?._id || null;
      const pId = req.query.pId;
      if (!pId) {
        return res.status(400).json({ error: "Product Id is required" });
      }
      const product = await productModel.findById(pId).lean();

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      let response = { product };
      response.product.isInWishlist = false;
      if (userId) {
        const user = await userModels.findById(userId).select("wishlist");
        if (user && user.wishlist) {
          const isInWishlist = await userModels.exists({
            _id: userId,
            wishlist: pId,
          });
          response.product.isInWishlist = !!isInWishlist;
        }
      }
      return res.status(200).json({ product: response.product });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getCartProduct(req, res) {
    try {
      const userId = req.user._id;
      
      const cartItems = await cartItemModels
      .find({ user: userId })
      .populate({
        path: "productId",
        model: "products",
        select: "pName pPrice pImages pOffer", // Select only necessary fields
      })
      .lean();
      
      if (cartItems.length === 0)
        return res.status(404).json({ error: "cartItems not found" });
      
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async addCartProduct(req, res) {
    try {
      const userId = req.user._id;
      const { productId, quantity, color, size } = req.body;
      const updatedItem = await cartItemModels.findOneAndUpdate(
        {
          productId,
          user: userId,
          "variant.color": color,
          "variant.size": size,
        },
        {
          $inc: { quantity: Number(quantity) }, 
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      await userModels.findByIdAndUpdate(userId, {
        $addToSet: { cart: updatedItem._id },
      });
      return res.status(200).json({ message: "Cart updated successfully!", updatedItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async updateCartItem(req, res) {
    try {
      const { quantity } = req.body;
      const { cartItemId } = req.params;
      
      const cartItem = await cartItemModels.findById(cartItemId);
      if (!cartItem) {
        return res
        .status(500)
        .json({ success: false, message: "cart item not found" });
      }
      cartItem.quantity = Number(quantity);
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: `updated quantity ${cartItem.quantity}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteCartProduct(req, res) {
    try {
      const userId = req.user._id;
      const { cartItemId } = req.params;
      
      const cartItem = await cartItemModels.findByIdAndDelete(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      
      // Remove the cartItemId from the User's cart array
      await userModels.findByIdAndUpdate(userId, {
        $pull: { cart: cartItemId },
      });
      
      return res
      .status(200)
      .json({ message: "Cart item removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getWishProduct(req, res) {
    const user = req.user;
    const wishList = await userModels
    .findById(user._id)
    .populate("wishlist")
    .select("wishlist");
    if (!wishList) {
      return res.json({ success: false, message: "Wishlist Not Found" });
    } else if (wishList.length === 0) {
      return res.json({ success: true, message: "Wishlist is empty" });
    }
    return res.json({
      success: true,
      message: "Wishlist Found",
      data: wishList,
    });
  }
  async toggleWishProduct(req, res) {
    try {
      const userId = req.user._id;
      const { productId } = req.body;
      
      // Validate productId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
        .status(400)
        .json({ success: false, error: "Invalid productId" });
      }
      
      // Find user
      const user = await userModels.findById(userId);
      if (!user) {
        return res
        .status(404)
        .json({ success: false, error: "User not found" });
      }
      
      const productObjectId = new mongoose.Types.ObjectId(productId);
      const wishlistIndex = user.wishlist.findIndex((id) =>
        id.equals(productObjectId)
    );
    
    if (wishlistIndex > -1) {
      // Remove from wishlist
      user.wishlist.splice(wishlistIndex, 1);
      await user.save();
      return res
      .status(200)
      .json({ success: true, message: "Product removed from wishlist" });
    } else {
      // Add to wishlist
      user.wishlist.push(productObjectId);
      await user.save();
      return res
      .status(200)
      .json({ success: true, message: "Product added to wishlist" });
    }
  } catch (error) {
    console.error(error);
    return res
    .status(500)
    .json({ success: false, error: "Internal Server Error" });
  }
}
async postAddReview(req, res) {
  try {
      const userId = req.user._id;
      const { productId, rating, reviewTitle, reviewDescription } = req.body;
      
      if (!rating || !reviewTitle || !reviewDescription) {
        return res
        .status(400)
        .json({ error: "Rating and review are required" });
      }
      
      if (rating < 1 || rating > 5) {
        return res
        .status(400)
        .json({ error: "Rating must be between 1 and 5" });
      }
      
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Check if user already reviewed the product
      const existingReview = await productReviewModels.findOne({
        user: userId,
        _id: { $in: product.pReviews },
      });
      if (existingReview) {
        return res
        .status(400)
        .json({ error: "You have already reviewed this product" });
      }
      
      // Create a new review
      const newReview = new productReviewModels({
        user: userId,
        product: productId,
        rating,
        review: {
          title: reviewTitle,
          description: reviewDescription,
        },
      });
      
      await newReview.save();
      product.pReviews.push(newReview._id);
      await product.save();
      await updateProductRating(productId);
      return res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      console.error("Error adding review:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
async deleteReview(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    
    const review = await productReviewModels.findOneAndDelete({ _id: id, user: userId });
    
    if (!review) {
      return res.status(404).json({ error: "Review not found or unauthorized" });
    }
    await productModel.findByIdAndUpdate(
      { _id: review.product }, 
      { $pull: { pReviews: id }, $inc: { reviewCount: -1 } }
    );
    await updateProductRating(review.product);
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async getProductReviews(req, res) {
  try {
    const {
      page = 1,
      limit = 5,
      sort = "latest",
      rating,
    } = req.query;
    const productId = new mongoose.Types.ObjectId(req.params.id);
    
    let sortOrder = {};
    if (sort === "latest") sortOrder.createdAt = -1;
    else if (sort === "oldest") sortOrder.createdAt = 1;
    else if (sort === "highest") sortOrder.rating = -1;
    else if (sort === "lowest") sortOrder.rating = 1;
    const filter = { product: productId };
    if (rating) filter.rating = parseInt(rating);

    const [totalReviews, ratingDistribution, reviews] = await Promise.all([
      productReviewModels.countDocuments({ product: productId }),
      productReviewModels.aggregate([
        { $match: { product: productId } },
        { $group: { _id: "$rating", count: { $sum: 1 } } }
      ]),
      productReviewModels
        .find(filter)
        .populate("user", "name")
        .sort(sortOrder)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
    ]);
    const ratingDistributionCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingDistribution.forEach(({ _id, count }) => {
      ratingDistributionCount[_id] = count;
    });    
    res.json({
      totalReviews,
      ratingDistributionCount,
      reviews,
    });
  } catch (error) {
    console.log("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
}
}
  
  const productController = new Product();
  export default productController;
  