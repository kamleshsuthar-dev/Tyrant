import slugify from "slugify";
import { Types } from "mongoose";
import { Request, Response } from "express";
import CategoryModel, { ICategory } from "../models/category.model";
import categoryServices from "../services/category/category.services";
import { deleteMedia } from "../services/multer/multer.services";

export default class CategoryController {
    static async createCategory (req: Request, res: Response) {
        try {
            const { name, description, parent } = req.body;

            const slug = slugify(name, { lower: true });

            const existing = await CategoryModel.findOne({ slug });
            if (existing){
                res.status(409).json({ success: false, message: "Category already exists" });
                return; 
            }

            const newCategoryData: Partial<ICategory> = {
            name,
            slug,
            description,
            isActive: true,
            parent: parent || null,
            };
            
            if (req.file) {
                const file = req.file as any;
                newCategoryData.image = {
                url: file.path,
                public_id: file.filename ?? file.public_id ?? "",
                };
            }

            if (parent) {
            const parentCategory = await CategoryModel.findById(parent);
            if (!parentCategory) {
                res.status(404).json({ success: false, message: "Parent category not found" });
                return; 
            }
                newCategoryData.ancestors = [...(parentCategory.ancestors ?? []), parentCategory._id] as Types.ObjectId[];
            }
            const newCategory = await CategoryModel.create(newCategoryData);
            res.status(201).json({success: true, message: "Category created successfully",newCategory});
        } catch (error) {
            console.error("Create Category Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
    static async getAllCategories (req: Request, res: Response) {
        try {
            const data = await categoryServices.getCategories();
            res.status(200).json({success:true, data})
        } catch (error) {
            console.error("Get Categories Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
    static async getCategoryById (req: Request, res: Response) {
        try {
            const data = await categoryServices.getCategoryById(req.params.id);
            if (!data) {
                res.status(404).json({ success: false, message: "Category not found" });
                return; 
            }
            res.status(200).json({success:true, data});
        } catch (error) {
            console.error("Get Category Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
    static async updateCategory (req: Request, res: Response) {
        try {
            const data = await categoryServices.updateCategoryById(req.params.id, req.body);
            if (!data) {
                res.status(404).json({ success: false, message: "Category not found" });
                return;
            }
            if (req.file) {
                const file = req.file as any;
                
                if (data?.image?.public_id) {
                    await deleteMedia(data?.image?.public_id, "image");
                }

                data.image = {
                url: file.path,
                public_id: file.filename ?? file.public_id ?? "",
                };

                await data.save();
            }
            res.status(200).json({success:true, data});
        } catch (error) {
            console.error("Update Category Error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
            return;
        }
    };
    static async deleteCategory (req: Request, res: Response) {
        try {
            const deleted = await categoryServices.deleteCategoryById(req.params.id);
            if (!deleted) {
                res.status(404).json({ success: false, message: "Category not found" });
                return;
            }
            if (deleted?.image?.public_id) {
                await deleteMedia(deleted?.image?.public_id, "image");
            }
            res.status(200).json({ success: true, message: "Category deleted successfully" });
        } catch (error) {
            console.error("Delete Category Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
    static async toggleCategoryActiveStatus (req: Request, res: Response) {
        try {
            const updatedCategory = await categoryServices.toggleCategoryStatus(req.params.id);
            if (!updatedCategory) {
                res.status(404).json({ success: false, message: "Category not found" });
                return;
            }
            res.status(200).json({ success: true, message: `Category status toggled to ${updatedCategory.isActive ? "active" : "inactive"}`, data: updatedCategory, });
        } catch (error) {
            console.error("Toggle Category Error:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
}

