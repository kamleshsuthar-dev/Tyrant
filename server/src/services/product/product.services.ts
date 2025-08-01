import ProductModel, {IProduct} from "models/product.model";
import { FilterQuery, Types, UpdateQuery } from "mongoose";

export default class productServices{
    static async getProducts(
        filter: FilterQuery<IProduct> = {},
        sort: Record<string, 1 | -1> = { createdAt: -1 },
        page: number = 1,
        limit: number = 10
        ) {
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
    }; 
    static async getProductByIdOrSlug(idOrSlug: string) {
        const isObjectId = Types.ObjectId.isValid(idOrSlug);
        const query: FilterQuery<IProduct> = isObjectId
        ? { _id: idOrSlug }
        : { slug: idOrSlug };
        const product = await ProductModel.findOne(query)
        .populate("category", "name slug")
        .populate("seller", "name email");;
        return product;
    };
    static async createProduct(productData: Partial<IProduct>) {
        const product = await ProductModel.create(productData);
        return product;
    };
    static async updateProductById (
        productId: String,
        updates: UpdateQuery<IProduct>,
        sellerId: Types.ObjectId 
    ){
        const product = await ProductModel.findOne({ _id: productId, seller: sellerId });
        if (!product) return null;
        Object.assign(product, updates);
        return product.save();
    };
    static async deleteProductById(
        productId: String, 
        sellerId: Types.ObjectId ) {
        const product = await ProductModel.findOneAndDelete({ _id:productId, seller: sellerId });
        return product;
    };
    static async addVariant(
        productId: String, 
        variantData: any, 
        sellerId: Types.ObjectId | undefined,) 
    {
        const product = await ProductModel.findOne({ _id:productId, seller:sellerId });
        if (!product) return null;
        product.variants.push(variantData);
        await product.save();
        return product;
    }
    static async updateVariant(
        productId: String, 
        variantId: String, 
        variantData: any,
        sellerId: Types.ObjectId | undefined, ) 
    {
        const product = await ProductModel.findOne({ _id:productId, seller:sellerId });
        if (!product) return null;
        const variant = product.variants.id(variantId);
        if (!variant) return null;
        Object.assign(variant, variantData);
        await product.save();
        return product;
    }
    static async deleteVariant(
        productId: String, 
        variantId: String, 
        sellerId: Types.ObjectId | undefined, ) 
    {
        const product = await ProductModel.findOne({ _id:productId, seller:sellerId });
        if (!product) return null;
        const variant = product.variants.id(variantId);
        if (!variant) return null;
        variant.deleteOne();
        await product.save();
        return product;
    }
}