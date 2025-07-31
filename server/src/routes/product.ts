import ProductController from 'controllers/product.controller';
import { Router } from 'express';
import { verifyToken, attachUserIfExists } from 'middlewares/auth/authenticate';
import { isSeller } from 'middlewares/auth/authorize';

export default (router: Router)=>{
    router.get("/products", attachUserIfExists, ProductController.getAllProduct);
    router.get("/products/:idOrSlug", attachUserIfExists, ProductController.getSingleProduct);
    router.post("/products", verifyToken, isSeller, ProductController.createProduct);
    router.put("/products/:id", verifyToken, isSeller, ProductController.updateProduct);
    router.delete("/products/:id", verifyToken, isSeller, ProductController.deleteProduct);
    router.post("/products/:id/variants", verifyToken, isSeller, ProductController.addProductVariant);
    router.put("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.addProductVariant);
    router.delete("/products/:id/variants/:variantId", verifyToken, isSeller, ProductController.addProductVariant);
}
