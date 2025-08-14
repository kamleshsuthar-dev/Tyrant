"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductVariantSchema = exports.updateProductVariantSchema = exports.addProductVariantSchema = exports.productVariantSchema = exports.updateProductSchema = exports.createProductSchema = exports.getProductByIdOrSlug = exports.getProducts = void 0;
const zod_1 = require("zod");
const index_schema_1 = require("./index.schema"); // Assuming objectId is defined in index.schema
const zodTransformers_1 = require("../../utils/zodTransformers");
exports.getProducts = zod_1.z.object({
    query: zod_1.z.object({
        page: (0, zodTransformers_1.toNumber)("page", 1).optional().default("1"),
        limit: (0, zodTransformers_1.toNumber)("limit", 1).optional().default("10"),
        category: (0, index_schema_1.objectId)("category").optional(),
        brand: zod_1.z.string().optional(),
        isFeatured: (0, zodTransformers_1.toBoolean)("inStock").optional().default("false"),
        isActive: (0, zodTransformers_1.toBoolean)("inStock").optional().default("true"),
        seller: (0, index_schema_1.objectId)("seller").optional(),
        search: zod_1.z.string().optional(),
        minPrice: (0, zodTransformers_1.toNumber)("minPrice", 0).optional(),
        maxPrice: (0, zodTransformers_1.toNumber)("maxPrice", 0).optional(),
        inStock: (0, zodTransformers_1.toBoolean)("inStock").optional().default("false"),
        sortOrder: zod_1.z.enum(["1", "-1"]).optional().default("-1"),
        sortBy: zod_1.z.string().optional().default("createdAt"),
    })
});
exports.getProductByIdOrSlug = zod_1.z.object({
    params: zod_1.z.object({
        idOrSlug: (0, index_schema_1.idOrSlug)("product"),
    }),
});
const variantSchema = zod_1.z.object({
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.string()), // key-value pairs like { size: "M", color: "Black" }
    basePrice: zod_1.z.number({ required_error: "Base Price is required" }).positive("Base Price must be a positive number"),
    discount: zod_1.z.number().min(0).max(100).optional().default(0),
    stock: zod_1.z.number().min(0).default(0),
    isActive: zod_1.z.boolean().optional().default(true),
});
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Product name is required" }).min(1, "Product name is required"),
        description: zod_1.z.string().optional(),
        brand: zod_1.z.string({ required_error: "Brand name is required" }).min(1, "Brand name is required"),
        category: (0, index_schema_1.objectId)("category"),
        variants: zod_1.z.array(variantSchema).optional().default([]),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        isFeatured: zod_1.z.boolean().optional(),
        isActive: zod_1.z.boolean().optional().default(true),
    }),
});
exports.updateProductSchema = exports.createProductSchema.partial();
exports.productVariantSchema = zod_1.z.object({
    variantName: zod_1.z.string({ required_error: "Variant name is required" }).min(1, "Variant name is required"),
    additionalPrice: zod_1.z.number().optional().default(0),
    stock: zod_1.z.number().optional().default(0),
});
exports.addProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string({ required_error: "Product ID is required" }),
    variant: exports.productVariantSchema,
});
exports.updateProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string({ required_error: "Product ID is required" }),
    variantId: zod_1.z.string({ required_error: "Variant ID is required" }),
    variant: exports.productVariantSchema,
});
exports.deleteProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string({ required_error: "Product ID is required" }),
    variantId: zod_1.z.string({ required_error: "Variant ID is required" }),
});
