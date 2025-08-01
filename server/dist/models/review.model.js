import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    description: { type: String, required: true },
    media: [{ type: String }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false }, // true if user bought the product
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
export default model("Review", reviewSchema);
//# sourceMappingURL=review.model.js.map