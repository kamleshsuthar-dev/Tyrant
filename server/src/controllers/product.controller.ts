import slugify from "slugify";
import { Request, Response } from "express";
import { IProduct } from "models/product.model";
import productServices from "services/product/product.services";
import { deleteMedia } from "services/multer/multer.services";
import { Types } from "mongoose";


const generateUniqueSlug = async (title: string): Promise<string> => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await productServices.getProductByIdOrSlug(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  return uniqueSlug;
};

export default class ProductController {
    
    static async getProducts(req: Request, res: Response) {
        try {
            const {
            page,
            limit,
            category,
            brand,
            isFeatured,
            isActive,
            seller,
            search,
            sortBy,
            sortOrder,
            minPrice,
            maxPrice,
            inStock,
            } = req.query;

            const filter: any = {};
            if (category) filter.category = category;
            if (brand) filter.brand = brand;
            if (isFeatured) filter.isFeatured = isFeatured === "true";
            if (isActive) filter.isActive = isActive === "true";
            if (seller) filter.seller = seller;
            if (inStock === "true") filter["variants.stock"] = { $gt: 0 };
            if (minPrice || maxPrice) {
            filter["variants.finalPrice"] = {};
            if (minPrice) filter["variants.finalPrice"].$gte = Number(minPrice);
            if (maxPrice) filter["variants.finalPrice"].$lte = Number(maxPrice);
            }
            if (search) filter.name = { $regex: search.toString(), $options: "i" };
            const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === "1" ? 1 : -1 };
            if(typeof page !== "number" || typeof limit !== "number") {
                res.status(400).json({ success: false, message: "Invalid query parameters" });
                return;
            }
            const products = await productServices.getProducts(filter, sort, page, limit);

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
        }catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async getSingleProduct(req: Request, res: Response) {
        try {
            const product = await productServices.getProductByIdOrSlug(req.params.idOrSlug);
            if(!product){
                res.status(404).json({ success: false, message: "Product not found" });
                return 
            }
            res.status(200).json({ success: true, data: product });
        }catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async createProduct(req: Request, res: Response) {
        try {
            const productData: Partial<IProduct> = req.body;
            productData.seller = req.user?.id;
            if(productData.name) {
                const slug = await generateUniqueSlug(productData.name);
                productData.slug = slug;    
            }
            const product = await productServices.createProduct(productData);
            res.status(201).json({ success: true, data: product });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async updateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const updates = req.body;
            const sellerId = req.user?._id;

            if (updates.name) {
                updates.slug = await generateUniqueSlug(updates.name);
            }
            if(!sellerId){
                res.status(403).json({success:false, message:"Unauthorized"})
                return
            }
            const updatedProduct = await productServices.updateProductById(
                productId,
                updates,
                sellerId
            );

            if (!updatedProduct) {
                res.status(403).json({ success: false, message: "Unauthorized or Product not found" });
                return 
            }
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async deleteProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const sellerId = req.user?._id;
            if(!sellerId){
                res.status(403).json({success:true, message:"Unauthorized"})
                return
            }
            const deletedProduct = await productServices.deleteProductById(productId, sellerId);
            
            if (!deletedProduct) {
                res.status(403).json({ success: false, message: "Unauthorized or Product not found" });
                return 
            }
            for (const variant of deletedProduct.variants) {
                for (const mediaItem of variant.media) {
                    await deleteMedia(mediaItem.public_id);
                }
            }
            res.status(200).json({ success: true, message: "Product deleted successfully" });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async addProductVariant(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const variantData = req.body;
            const sellerId = req.user?._id;
            if (!Types.ObjectId.isValid(id)) {
                res.status(400).json({ success: false, message: "Invalid product ID." });
                return 
            }
            const product = productServices.addVariant(id, variantData, sellerId)
            if(!product){
                res.status(403).json({success:false, message:"Unauthorised or not found"})
            }
            res.status(201).json({success:true, data:product})
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async updateProductVariant(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const variantId = req.params.variantId;
            const variantData = req.body;
            const sellerId = req.user?._id;
            if (!Types.ObjectId.isValid(productId)) {
                res.status(400).json({ success: false, message: "Invalid product ID." });
                return 
            }
            const product = productServices.updateVariant(productId, variantId, variantData, sellerId)
            if(!product){
                res.status(403).json({success:false, message:"Unauthorised or not found"})
            }
            res.status(201).json({success:true, data:product})
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    static async deleteProductVariant(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const variantId = req.params.variantId;
            const sellerId = req.user?._id;
            if (!Types.ObjectId.isValid(productId)) {
                res.status(400).json({ success: false, message: "Invalid product ID." });
                return 
            }
            const product = productServices.deleteVariant(productId, variantId, sellerId)
            if(!product){
                res.status(403).json({success:false, message:"Unauthorised or not found"})
            }
            res.status(201).json({success:true, data:product})
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
}
