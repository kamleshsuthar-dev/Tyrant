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
const product_model_1 = __importDefault(require("../../models/product.model"));
const mongoose_1 = require("mongoose");
class productServices {
    static getProducts() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, sort = { createdAt: -1 }, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const products = yield product_model_1.default.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate("category");
            const total = yield product_model_1.default.countDocuments(filter);
            return {
                data: products,
                page,
                totalPages: Math.ceil(total / limit),
                total,
            };
        });
    }
    ;
    static getProductByIdOrSlug(idOrSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            const isObjectId = mongoose_1.Types.ObjectId.isValid(idOrSlug);
            const query = isObjectId
                ? { _id: idOrSlug }
                : { slug: idOrSlug };
            const product = yield product_model_1.default.findOne(query)
                .populate("category", "name slug")
                .populate("seller", "name email");
            ;
            return product;
        });
    }
    ;
    static createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.create(productData);
            return product;
        });
    }
    ;
    static updateProductById(productId, updates, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
            if (!product)
                return null;
            Object.assign(product, updates);
            return product.save();
        });
    }
    ;
    static deleteProductById(productId, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOneAndDelete({ _id: productId, seller: sellerId });
            return product;
        });
    }
    ;
    static addVariant(productId, variantData, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
            if (!product)
                return null;
            product.variants.push(variantData);
            yield product.save();
            return product;
        });
    }
    static updateVariant(productId, variantId, variantData, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
            if (!product)
                return null;
            const variant = product.variants.id(variantId);
            if (!variant)
                return null;
            Object.assign(variant, variantData);
            yield product.save();
            return product;
        });
    }
    static deleteVariant(productId, variantId, sellerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findOne({ _id: productId, seller: sellerId });
            if (!product)
                return null;
            const variant = product.variants.id(variantId);
            if (!variant)
                return null;
            variant.deleteOne();
            yield product.save();
            return product;
        });
    }
}
exports.default = productServices;
