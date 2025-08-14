"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            variant: { type: mongoose_1.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
            productSnapshot: {
                name: String,
                brand: String,
                images: [String],
                price: Number,
                discount: Number,
                finalPrice: Number,
            },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: ["placed", "shipped", "delivered", "cancelled"],
        default: "placed",
    },
    paymentMethod: { type: String, enum: ["cod", "card", "upi"], required: true },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Order", orderSchema);
