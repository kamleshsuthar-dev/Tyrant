import ProductModel from "models/product.model";
import { Types } from "mongoose";
export default class productServices {
    static async getProducts(filter = {}, sort = { createdAt: -1 }, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const products = await ProductModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate("category");
        const total = await ProductModel.countDocuments(filter);
        return {
            data: products,
            page,
            totalPages: Math.ceil(total / limit),
            total,
        };
    }
    ;
    static async getProductByIdOrSlug(idOrSlug) {
        const isObjectId = Types.ObjectId.isValid(idOrSlug);
        const query = isObjectId
            ? { _id: idOrSlug }
            : { slug: idOrSlug };
        const product = await ProductModel.findOne(query)
            .populate("category", "name slug")
            .populate("seller", "name email");
        ;
        return product;
    }
    ;
    static async createProduct(productData) {
        const product = await ProductModel.create(productData);
        return product;
    }
    ;
    static async updateProductById(productId, updates, sellerId) {
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        if (!product)
            return null;
        Object.assign(product, updates);
        return product.save();
    }
    ;
    static async deleteProductById(productId, sellerId) {
        const product = await ProductModel.findOneAndDelete({ _id: productId, seller: sellerId });
        return product;
    }
    ;
    static async addVariant(productId, variantData, sellerId) {
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        if (!product)
            return null;
        product.variants.push(variantData);
        await product.save();
        return product;
    }
    static async updateVariant(productId, variantId, variantData, sellerId) {
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        if (!product)
            return null;
        const variant = product.variants.id(variantId);
        if (!variant)
            return null;
        Object.assign(variant, variantData);
        await product.save();
        return product;
    }
    static async deleteVariant(productId, variantId, sellerId) {
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        if (!product)
            return null;
        const variant = product.variants.id(variantId);
        if (!variant)
            return null;
        variant.deleteOne();
        await product.save();
        return product;
    }
}
//# sourceMappingURL=product.services.js.map