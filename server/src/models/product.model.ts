import { Schema, model, Document, Types } from "mongoose";

export interface IMedia {
  url: string;
  public_id: string;
  type: "image" | "video";
}
export interface inventoryItem {
  size: string;
  stock: number;
}

export interface IProductVariant extends Document {
  inventory: inventoryItem[]
  basePrice: number;
  discount?: number;
  media: IMedia[];
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
    inventory: [
      { 
        size: {type: String},
        stock: {type:Number, min: 0, default: 0},
      },
    ],
    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
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
    tags: [{type: String, trim: true, lowercase: true}],
    isFeatured: { type: Boolean, default: false },
},{ timestamps: true });

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export default model("Product", productSchema);

