import ProductController from 'controllers/product.controller';
import { verifyToken, attachUserIfExists } from 'middlewares/auth/authenticate';
import { isSeller } from 'middlewares/auth/authorize';
import { createProductSchema, getProductByIdOrSlug, getProducts, updateProductSchema } from 'validations/zod/product.schema';
import validateRequest from 'middlewares/validateRequest';
export default (router) => {
    router.get("/products", attachUserIfExists, validateRequest(getProducts), ProductController.getProducts);
    router.get("/products/:idOrSlug", attachUserIfExists, validateRequest(getProductByIdOrSlug), ProductController.getSingleProduct);
    router.post("/products", verifyToken, isSeller, validateRequest(createProductSchema), ProductController.createProduct);
    router.put("/products/:id", verifyToken, isSeller, validateRequest(updateProductSchema), ProductController.updateProduct);
    router.delete("/products/:id", verifyToken, isSeller, ProductController.deleteProduct);
    router.post("/products/:id/variants", verifyToken, isSeller, ProductController.addProductVariant);
    router.put("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.addProductVariant);
    router.delete("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.addProductVariant);
};
//# sourceMappingURL=product.route.js.map