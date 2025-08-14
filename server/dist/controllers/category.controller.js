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
const slugify_1 = __importDefault(require("slugify"));
const category_model_1 = __importDefault(require("../models/category.model"));
const category_services_1 = __importDefault(require("../services/category/category.services"));
const multer_services_1 = require("../services/multer/multer.services");
class CategoryController {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { name, description, parent } = req.body;
                const slug = (0, slugify_1.default)(name, { lower: true });
                const existing = yield category_model_1.default.findOne({ slug });
                if (existing) {
                    res.status(409).json({ success: false, message: "Category already exists" });
                    return;
                }
                const newCategoryData = {
                    name,
                    slug,
                    description,
                    isActive: true,
                    parent: parent || null,
                };
                if (req.file) {
                    const file = req.file;
                    newCategoryData.image = {
                        url: file.path,
                        public_id: (_b = (_a = file.filename) !== null && _a !== void 0 ? _a : file.public_id) !== null && _b !== void 0 ? _b : "",
                    };
                }
                if (parent) {
                    const parentCategory = yield category_model_1.default.findById(parent);
                    if (!parentCategory) {
                        res.status(404).json({ success: false, message: "Parent category not found" });
                        return;
                    }
                    newCategoryData.ancestors = [...((_c = parentCategory.ancestors) !== null && _c !== void 0 ? _c : []), parentCategory._id];
                }
                const newCategory = yield category_model_1.default.create(newCategoryData);
                res.status(201).json({ success: true, message: "Category created successfully", newCategory });
            }
            catch (error) {
                console.error("Create Category Error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    ;
    static getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield category_services_1.default.getCategories();
                res.status(200).json({ success: true, data });
            }
            catch (error) {
                console.error("Get Categories Error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    ;
    static getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield category_services_1.default.getCategoryById(req.params.id);
                if (!data) {
                    res.status(404).json({ success: false, message: "Category not found" });
                    return;
                }
                res.status(200).json({ success: true, data });
            }
            catch (error) {
                console.error("Get Category Error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    ;
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const data = yield category_services_1.default.updateCategoryById(req.params.id, req.body);
                if (!data) {
                    res.status(404).json({ success: false, message: "Category not found" });
                    return;
                }
                if (req.file) {
                    const file = req.file;
                    if ((_a = data === null || data === void 0 ? void 0 : data.image) === null || _a === void 0 ? void 0 : _a.public_id) {
                        yield (0, multer_services_1.deleteMedia)((_b = data === null || data === void 0 ? void 0 : data.image) === null || _b === void 0 ? void 0 : _b.public_id, "image");
                    }
                    data.image = {
                        url: file.path,
                        public_id: (_d = (_c = file.filename) !== null && _c !== void 0 ? _c : file.public_id) !== null && _d !== void 0 ? _d : "",
                    };
                    yield data.save();
                }
                res.status(200).json({ success: true, data });
            }
            catch (error) {
                console.error("Update Category Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
                return;
            }
        });
    }
    ;
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const deleted = yield category_services_1.default.deleteCategoryById(req.params.id);
                if (!deleted) {
                    res.status(404).json({ success: false, message: "Category not found" });
                    return;
                }
                if ((_a = deleted === null || deleted === void 0 ? void 0 : deleted.image) === null || _a === void 0 ? void 0 : _a.public_id) {
                    yield (0, multer_services_1.deleteMedia)((_b = deleted === null || deleted === void 0 ? void 0 : deleted.image) === null || _b === void 0 ? void 0 : _b.public_id, "image");
                }
                res.status(200).json({ success: true, message: "Category deleted successfully" });
            }
            catch (error) {
                console.error("Delete Category Error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    ;
    static toggleCategoryActiveStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield category_services_1.default.toggleCategoryStatus(req.params.id);
                if (!updatedCategory) {
                    res.status(404).json({ success: false, message: "Category not found" });
                    return;
                }
                res.status(200).json({ success: true, message: `Category status toggled to ${updatedCategory.isActive ? "active" : "inactive"}`, data: updatedCategory, });
            }
            catch (error) {
                console.error("Toggle Category Error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });
    }
    ;
}
exports.default = CategoryController;
