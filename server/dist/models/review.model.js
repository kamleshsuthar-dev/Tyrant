"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order", required: true },
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
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
