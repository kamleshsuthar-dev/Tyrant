import { Schema, model, Document, Types } from "mongoose";

export interface IMedia {
  url: string;
  public_id: string;
  type: "image" | "video";
}

export interface IProductVariant extends Document {
  attributes: Record<string, string>;
  basePrice: number;
  discount?: number;
  media: IMedia[];
  stock: number;
  isActive: boolean;
  finalPrice?: number;
  
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: Types.ObjectId;
  seller: Types.ObjectId;
  avgRating: number;
  reviewCount: number;
  variants: Types.DocumentArray<IProductVariant>;
  isActive: boolean;
  tags?: string[];
  isFeatured?: boolean; 
}

const variantSchema = new Schema<IProductVariant>(
  {
    attributes: { type: Map, of: String, default: {} },
    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    media: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], required: true },
      },
    ],
  },{ _id: true }
);

variantSchema.virtual("finalPrice").get(function (this: IProductVariant) {
  const discount = this.discount || 0;
  return this.basePrice * (1 - discount / 100);
});

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true,},
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String},
    brand: { type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: "Category", index:true, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    variants: [variantSchema],
    isActive: { type: Boolean, default: true },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
},{ timestamps: true });

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export default model("Product", productSchema);

