import CategoryController from "controllers/category.controller";
import { verifyToken } from "middlewares/auth/authenticate";
import { isAdmin } from "middlewares/auth/authorize";
import { singleImageUpload } from "middlewares/multer";
export default (router) => {
    router.post("/categories", verifyToken, isAdmin, singleImageUpload, CategoryController.createCategory);
    router.get("/categories", CategoryController.getAllCategories);
    router.get("/categories/:id", CategoryController.getCategoryById);
    router.put("/categories/:id", verifyToken, isAdmin, singleImageUpload, CategoryController.updateCategory);
    router.delete("/categories/:id", verifyToken, isAdmin, CategoryController.deleteCategory);
    router.patch("/categories/:id/toggle", verifyToken, isAdmin, CategoryController.toggleCategoryActiveStatus);
};
//# sourceMappingURL=category.route.js.map