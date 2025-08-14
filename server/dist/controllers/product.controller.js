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
const product_services_1 = __importDefault(require("../services/product/product.services"));
const multer_services_1 = require("../services/multer/multer.services");
const mongoose_1 = require("mongoose");
const generateUniqueSlug = (title) => __awaiter(void 0, void 0, void 0, function* () {
    let baseSlug = (0, slugify_1.default)(title, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (yield product_services_1.default.getProductByIdOrSlug(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${counter++}`;
    }
    return uniqueSlug;
});
class ProductController {
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, category, brand, isFeatured, isActive, seller, search, sortBy, sortOrder, minPrice, maxPrice, inStock, } = req.query;
                const filter = {};
                if (category)
                    filter.category = category;
                if (brand)
                    filter.brand = brand;
                if (isFeatured)
                    filter.isFeatured = isFeatured === "true";
                if (isActive)
                    filter.isActive = isActive === "true";
                if (seller)
                    filter.seller = seller;
                if (inStock === "true")
                    filter["variants.stock"] = { $gt: 0 };
                if (minPrice || maxPrice) {
                    filter["variants.finalPrice"] = {};
                    if (minPrice)
                        filter["variants.finalPrice"].$gte = Number(minPrice);
                    if (maxPrice)
                        filter["variants.finalPrice"].$lte = Number(maxPrice);
                }
                if (search)
                    filter.name = { $regex: search.toString(), $options: "i" };
                const sort = { [sortBy]: sortOrder === "1" ? 1 : -1 };
                if (typeof page !== "number" || typeof limit !== "number") {
                    res.status(400).json({ success: false, message: "Invalid query parameters" });
                    return;
                }
                const products = yield product_services_1.default.getProducts(filter, sort, page, limit);
                res.status(200).json({
                    success: true,
                    data: products.data,
                    pagination: {
                        total: products.total,
                        page: products.page,
                        limit: limit,
                        totalPages: products.totalPages,
                    },
                });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static getSingleProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_services_1.default.getProductByIdOrSlug(req.params.idOrSlug);
                if (!product) {
                    res.status(404).json({ success: false, message: "Product not found" });
                    return;
                }
                res.status(200).json({ success: true, data: product });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const productData = req.body;
                productData.seller = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (productData.name) {
                    const slug = yield generateUniqueSlug(productData.name);
                    productData.slug = slug;
                }
                const product = yield product_services_1.default.createProduct(productData);
                res.status(201).json({ success: true, data: product });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const productId = req.params.id;
                const updates = req.body;
                const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (updates.name) {
                    updates.slug = yield generateUniqueSlug(updates.name);
                }
                if (!sellerId) {
                    res.status(403).json({ success: false, message: "Unauthorized" });
                    return;
                }
                const updatedProduct = yield product_services_1.default.updateProductById(productId, updates, sellerId);
                if (!updatedProduct) {
                    res.status(403).json({ success: false, message: "Unauthorized or Product not found" });
                    return;
                }
                res.status(200).json({ success: true, data: updatedProduct });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const productId = req.params.id;
                const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!sellerId) {
                    res.status(403).json({ success: true, message: "Unauthorized" });
                    return;
                }
                const deletedProduct = yield product_services_1.default.deleteProductById(productId, sellerId);
                if (!deletedProduct) {
                    res.status(403).json({ success: false, message: "Unauthorized or Product not found" });
                    return;
                }
                for (const variant of deletedProduct.variants) {
                    for (const mediaItem of variant.media) {
                        yield (0, multer_services_1.deleteMedia)(mediaItem.public_id);
                    }
                }
                res.status(200).json({ success: true, message: "Product deleted successfully" });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static addProductVariant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const variantData = req.body;
                const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ success: false, message: "Invalid product ID." });
                    return;
                }
                const product = product_services_1.default.addVariant(id, variantData, sellerId);
                if (!product) {
                    res.status(403).json({ success: false, message: "Unauthorised or not found" });
                }
                res.status(201).json({ success: true, data: product });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static updateProductVariant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const productId = req.params.id;
                const variantId = req.params.variantId;
                const variantData = req.body;
                const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!mongoose_1.Types.ObjectId.isValid(productId)) {
                    res.status(400).json({ success: false, message: "Invalid product ID." });
                    return;
                }
                const product = product_services_1.default.updateVariant(productId, variantId, variantData, sellerId);
                if (!product) {
                    res.status(403).json({ success: false, message: "Unauthorised or not found" });
                }
                res.status(201).json({ success: true, data: product });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
    static deleteProductVariant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const productId = req.params.id;
                const variantId = req.params.variantId;
                const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!mongoose_1.Types.ObjectId.isValid(variantId)) {
                    res.status(400).json({ success: false, message: "Invalid product ID." });
                    return;
                }
                const product = product_services_1.default.deleteVariant(productId, variantId, sellerId);
                if (!product) {
                    res.status(403).json({ success: false, message: "Unauthorised or not found" });
                }
                res.status(201).json({ success: true, data: product });
            }
            catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        });
    }
    ;
}
exports.default = ProductController;
