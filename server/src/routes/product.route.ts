import ProductController from '../controllers/product.controller';
import { Router } from 'express';
import { verifyToken, attachUserIfExists } from '../middlewares/auth/authenticate';
import { isSeller } from '../middlewares/auth/authorize';
import { createProductSchema, getProductByIdOrSlug, getProducts, updateProductSchema } from '../validations/zod/product.schema';
import validateRequest from '../middlewares/validateRequest';

export default (router: Router)=>{
    // public product routes
    router.get("/products", attachUserIfExists, validateRequest(getProducts),ProductController.getProducts);
    router.get("/products/:idOrSlug", attachUserIfExists, validateRequest(getProductByIdOrSlug),ProductController.getSingleProduct);
    
    // product CRUD APIs
    router.post("/products", verifyToken, isSeller, validateRequest(createProductSchema), ProductController.createProduct);
    router.put("/products/:id", verifyToken, isSeller, validateRequest(updateProductSchema), ProductController.updateProduct);
    router.delete("/products/:id", verifyToken, isSeller, ProductController.deleteProduct);

    // variants APIs
    router.post("/products/:id/variants", verifyToken, isSeller, ProductController.addProductVariant);
    router.put("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.updateProductVariant);
    router.delete("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.deleteProductVariant);
}
