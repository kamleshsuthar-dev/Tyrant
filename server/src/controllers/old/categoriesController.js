import categoryModel from "../../models/categories.models.js";
import productModel from "../../models/product.models.js";
import { toTitleCase } from "../../utils/function.js";
import { deleteImage } from "../cloudinary.js";

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel
        .find({})
        .sort({ _id: -1 })
        .populate("cProducts");
      if (Categories.length > 0) {
        return res.status(200).json({
          success: true,
          Categories,
        });
      }
      return res.status(200).json({
        success: true,
        message: "No Categories found",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching categories",
      });
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file ? req.file : null;
    if (!cName || !cDescription || !cStatus || !cImage) {
      if (cImage) {
        const publicId = cImage.filename;
        await deleteImage(publicId);
      }
      let error = "All fields must be filled";
      if (!cName) {
        error = "Category name is required";
      } else if (!cDescription) {
        error = "Category description is required";
      } else if (!cStatus) {
        error = "Category status is required";
      } else if (!cImage) {
        error = "Category Image is required";
      }
      return res.status(400).json({
        success: false,
        message: error,
      });
    } else {
      cName = toTitleCase(cName);
      const publicId = cImage.filename;
      const imageUrl = req.file.path;
      try {
        let checkCategoryExists = await categoryModel.findOne({ cName: cName });
        if (checkCategoryExists) {
          await deleteImage(publicId);
          return res.json({ error: "Category already exists" });
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
            cStatus,
            cImage: publicId,
            cImageURL: imageUrl,
          });
          await newCategory.save();

          return res.json({ success: "Category created successfully" });
        }
      } catch (err) {
        return res.status(500).send("error creating category");
      }
    }
  }

  async postEditCategory(req, res) {
    try {
      let { cId, cName, cDescription, cStatus } = req.body;
      const imageFile = req.file || null;

      if (!cId || !cName || !cDescription || !cStatus) {
        if (imageFile) {
          await deleteImage(imageFile.filename);
        }
        let error = "All fields must be filled";
        if (!cId) {
          error = "Category Id is required";
        } else if (!cName) {
          error = "Category name is required";
        } else if (!cDescription) {
          error = "Category description is required";
        } else if (!cStatus) {
          error = "Category status is required";
        }
        return res.status(400).json({
          success: false,
          message: error,
        });
      }
      let existingCategory = await categoryModel.findById(cId);
      if (!existingCategory) {
        await deleteImage(imageFile.filename);
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      if (imageFile) {
        await deleteImage(existingCategory.cImage);
        existingCategory.cImage = imageFile.filename;
        existingCategory.cImageURL = imageFile.path;
      }
      existingCategory.cName = toTitleCase(cName);
      existingCategory.cDescription = cDescription;
      existingCategory.cStatus = cStatus;
      await existingCategory.save();
      return res.send({ success: "Category updated successfully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating category",
        error: error.message,
      });
    }
  }
  async getDeleteCategory(req, res) {
    try {
      let { cId } = req.body;

      if (!cId) {
        return res.json({ error: "All fields must be filled" });
      } else {
        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          const publicId = deleteCategory.cImage;
          await deleteImage(publicId);
          deleteCategory.cProducts.forEach(async (product) => {
            if (!(await productModel.findById(product))) {
              return res.json({ error: "Product not found" });
            } else {
              const deleteProduct =
                await productModel.findByIdAndDelete(product);
              if (deleteProduct) {
                deleteProduct.pImages.forEach((img) => {
                  deleteImage(img.ImageName);
                });
              }
            }
          });
          return res.json({
            success: true,
            message: "Category deleted successfully",
          });
        }
        return res.status(500).json({
          success: false,
          message: "Category not found",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting category",
      });
    }
  }
}

const categoryController = new Category();
export default categoryController;
