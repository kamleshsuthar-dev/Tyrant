import { z } from "zod";
import { objectId, idOrSlug } from "./index.schema"; // Assuming objectId is defined in index.schema
import { toNumber, toBoolean } from "../../utils/zodTransformers";

export const getProducts = z.object({
  query: z.object({
    page: toNumber("page", 1).optional().default("1"),
    limit: toNumber("limit", 1).optional().default("10"),
    category: objectId("category").optional(),
    brand: z.string().optional(),
    isFeatured: toBoolean("inStock").optional().default("false"),
    isActive: toBoolean("inStock").optional().default("true"),
    seller: objectId("seller").optional(),
    search: z.string().optional(),
    minPrice: toNumber("minPrice", 0).optional(),
    maxPrice: toNumber("maxPrice", 0).optional(),
    inStock: toBoolean("inStock").optional().default("false"),
    sortOrder: z.enum(["1", "-1"]).optional().default("-1"),
    sortBy: z.string().optional().default("createdAt"),
  })
});

export const getProductByIdOrSlug = z.object({
  params: z.object({
    idOrSlug: idOrSlug("product"),
  }),
});

const variantSchema = z.object({
  attributes: z.record(z.string(), z.string()), // key-value pairs like { size: "M", color: "Black" }
  basePrice: z.number({ required_error: "Base Price is required" }).positive("Base Price must be a positive number"),
  discount: z.number().min(0).max(100).optional().default(0),
  stock: z.number().min(0).default(0),
  isActive: z.boolean().optional().default(true),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name is required" }).min(1, "Product name is required"),
    description: z.string().optional(),
    brand: z.string({ required_error: "Brand name is required" }).min(1, "Brand name is required"),
    category: objectId("category"),
    variants: z.array(variantSchema).optional().default([]),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional().default(true),
  }),
});

  



export const updateProductSchema = createProductSchema.partial();


export const productVariantSchema = z.object({
  variantName: z.string({ required_error: "Variant name is required" }).min(1, "Variant name is required"),
  additionalPrice: z.number().optional().default(0),
  stock: z.number().optional().default(0),
});

export const addProductVariantSchema = z.object({
  id: z.string({ required_error: "Product ID is required" }),
  variant: productVariantSchema,
});

export const updateProductVariantSchema = z.object({
  id: z.string({ required_error: "Product ID is required" }),
  variantId: z.string({ required_error: "Variant ID is required" }),
  variant: productVariantSchema,
});

export const deleteProductVariantSchema = z.object({
  id: z.string({ required_error: "Product ID is required" }),
  variantId: z.string({ required_error: "Variant ID is required" }),
});


