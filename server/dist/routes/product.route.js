"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const authenticate_1 = require("../middlewares/auth/authenticate");
const authorize_1 = require("../middlewares/auth/authorize");
const product_schema_1 = require("../validations/zod/product.schema");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
exports.default = (router) => {
    router.get("/products", authenticate_1.attachUserIfExists, (0, validateRequest_1.default)(product_schema_1.getProducts), product_controller_1.default.getProducts);
    router.get("/products/:idOrSlug", authenticate_1.attachUserIfExists, (0, validateRequest_1.default)(product_schema_1.getProductByIdOrSlug), product_controller_1.default.getSingleProduct);
    router.post("/products", authenticate_1.verifyToken, authorize_1.isSeller, (0, validateRequest_1.default)(product_schema_1.createProductSchema), product_controller_1.default.createProduct);
    router.put("/products/:id", authenticate_1.verifyToken, authorize_1.isSeller, (0, validateRequest_1.default)(product_schema_1.updateProductSchema), product_controller_1.default.updateProduct);
    router.delete("/products/:id", authenticate_1.verifyToken, authorize_1.isSeller, product_controller_1.default.deleteProduct);
    router.post("/products/:id/variants", authenticate_1.verifyToken, authorize_1.isSeller, product_controller_1.default.addProductVariant);
    router.put("/products/:id/variants/:variantId", authenticate_1.verifyToken, authorize_1.isSeller, product_controller_1.default.addProductVariant);
    router.delete("/products/:id/variants/:variantId", authenticate_1.verifyToken, authorize_1.isSeller, product_controller_1.default.addProductVariant);
};
