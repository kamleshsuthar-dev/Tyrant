import { Schema, model } from "mongoose";
const variantSchema = new Schema({
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
}, { _id: true });
variantSchema.virtual("finalPrice").get(function () {
    const discount = this.discount || 0;
    return this.basePrice * (1 - discount / 100);
});
const productSchema = new Schema({
    name: { type: String, required: true, },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", index: true, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    variants: [variantSchema],
    isActive: { type: Boolean, default: true },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });
export default model("Product", productSchema);
//# sourceMappingURL=product.model.js.map