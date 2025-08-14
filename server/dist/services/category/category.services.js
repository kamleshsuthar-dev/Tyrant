"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../../models/category.model"));
const mongoose_1 = require("mongoose");
// 🔍 Get all categories (with optional filters or sorting)
// export const getCategories = (filter = {}, sort: SortOrder = { createdAt: -1 }) => 
//   CategoryModel.find(filter).sort(sort);
class categoryServices {
    static getCategories() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, sort = { createdAt: -1 }) {
            return yield category_model_1.default.find(filter).sort(sort);
        });
    }
    // 🔍 Get by MongoDB _id
    static getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(id))
                    return null;
                const category = yield category_model_1.default.findById(id);
                return category || null;
            }
            catch (error) {
                return null;
            }
        });
    }
    // // 🔁 Update category
    static updateCategoryById(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return null;
            const response = yield category_model_1.default.findByIdAndUpdate(id, update, { new: true });
            return response;
        });
    }
    // // 🗑 Delete category by ID
    static deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return null;
            const response = yield category_model_1.default.findByIdAndDelete(id);
            return response;
        });
    }
    // // 📈 Toggle active status
    static toggleCategoryStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id))
                return null;
            const category = yield category_model_1.default.findById(id);
            if (!category)
                return null;
            category.isActive = !category.isActive;
            return category.save();
        });
    }
    ;
}
exports.default = categoryServices;
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
