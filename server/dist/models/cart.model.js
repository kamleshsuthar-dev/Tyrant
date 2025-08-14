"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [
        {
            variant: { type: mongoose_1.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
            quantity: { type: Number, default: 1 },
            savedForLater: { type: Boolean, default: false },
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Cart", cartSchema);
