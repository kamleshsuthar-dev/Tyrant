import { Schema, model, Document, Types } from "mongoose";

export interface IProductVariant extends Document {
  product: Types.ObjectId;
  attributes: {
    color?: string;
    size?: string;
    material?: string;
  };
  price: number;
  discount?: number;
  images: string[];
  sku: string;
  quantityAvailable: number;
  isActive: boolean;
  soldCount: number;
}

const productVariantSchema = new Schema<IProductVariant>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  attributes: {
    color: { type: String },
    size: { type: String },
    material: { type: String },
  },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  images: [String],
  sku: { type: String, required: true, unique: true },
  quantityAvailable: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

productVariantSchema.virtual("finalPrice").get(function (this: IProductVariant) {
  return this.price * (1 - (this.discount ?? 0) / 100);
});

productVariantSchema.set("toJSON", { virtuals: true });
productVariantSchema.set("toObject", { virtuals: true });

export default model<IProductVariant>("ProductVariant", productVariantSchema);
