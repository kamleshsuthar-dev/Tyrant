import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  brand: string;
  category: Types.ObjectId;
  images: string[];
  basePrice?: number;
  discount: number;
  rating?: number;
  seller: Types.ObjectId;
  quantityAvailable: number;
  avgRating: number;
  reviewCount: number;
  soldCount: number;
  variants: Types.ObjectId[];
  isActive: boolean;
}

const productSchema = new Schema<IProduct>({
    name: {type: String, required: true,},
    description: {type: String},
    brand: {type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: "Category", index:true, required: true },
    images: [String],
    basePrice: {type: Number, required: true},
    discount: { type: Number, default: 0, min: 0, max: 100 },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantityAvailable: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    soldCount: {type: Number, default: 0,},
    variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
    isActive: { type: Boolean, default: true },
  },{ timestamps: true });


productSchema.virtual("finalPrice").get(function () {
  if (typeof this.basePrice === "number" && typeof this.discount === "number") {
    return this.basePrice * (1 - this.discount / 100);
  }
  return undefined;
});

// Enable virtuals in JSON & object output
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default model("Product", productSchema);
