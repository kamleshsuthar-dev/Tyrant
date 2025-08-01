import CategoryModel from "models/category.model";
import { Types } from "mongoose";
// 🔍 Get all categories (with optional filters or sorting)
// export const getCategories = (filter = {}, sort: SortOrder = { createdAt: -1 }) => 
//   CategoryModel.find(filter).sort(sort);
export default class categoryServices {
    static async getCategories(filter = {}, sort = { createdAt: -1 }) {
        return await CategoryModel.find(filter).sort(sort);
    }
    // 🔍 Get by MongoDB _id
    static async getCategoryById(id) {
        try {
            if (!Types.ObjectId.isValid(id))
                return null;
            const category = await CategoryModel.findById(id);
            return category || null;
        }
        catch (error) {
            return null;
        }
    }
    // // 🔁 Update category
    static async updateCategoryById(id, update) {
        if (!Types.ObjectId.isValid(id))
            return null;
        const response = await CategoryModel.findByIdAndUpdate(id, update, { new: true });
        return response;
    }
    // // 🗑 Delete category by ID
    static async deleteCategoryById(id) {
        if (!Types.ObjectId.isValid(id))
            return null;
        const response = await CategoryModel.findByIdAndDelete(id);
        return response;
    }
    // // 📈 Toggle active status
    static async toggleCategoryStatus(id) {
        if (!Types.ObjectId.isValid(id))
            return null;
        const category = await CategoryModel.findById(id);
        if (!category)
            return null;
        category.isActive = !category.isActive;
        return category.save();
    }
    ;
}
;
// // 🔍 Get by categoryId (custom field, if you use it)
// static async getCategoryByCategoryId = (categoryId: string) =>
//   CategoryModel.findOne({ categoryId });
// // 🔍 Get by name (case insensitive)
// static async getCategoryByName = (name: string) =>
//   CategoryModel.findOne({ name: new RegExp(`^${name}$`, "i") });
// // 🔍 Get by slug (for SEO-friendly URLs)
// static async getCategoryBySlug = (slug: string) =>
//   CategoryModel.findOne({ slug });
// // 📦 Create category
// static async createCategory = (data: Record<string, any>) =>
//   new CategoryModel(data).save().then(cat => cat.toObject());
//# sourceMappingURL=category.services.js.map