"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const authenticate_1 = require("../middlewares/auth/authenticate");
const authorize_1 = require("../middlewares/auth/authorize");
const multer_1 = require("../middlewares/multer");
exports.default = (router) => {
    router.post("/categories", authenticate_1.verifyToken, authorize_1.isAdmin, multer_1.singleImageUpload, category_controller_1.default.createCategory);
    router.get("/categories", category_controller_1.default.getAllCategories);
    router.get("/categories/:id", category_controller_1.default.getCategoryById);
    router.put("/categories/:id", authenticate_1.verifyToken, authorize_1.isAdmin, multer_1.singleImageUpload, category_controller_1.default.updateCategory);
    router.delete("/categories/:id", authenticate_1.verifyToken, authorize_1.isAdmin, category_controller_1.default.deleteCategory);
    router.patch("/categories/:id/toggle", authenticate_1.verifyToken, authorize_1.isAdmin, category_controller_1.default.toggleCategoryActiveStatus);
};
