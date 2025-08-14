"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
        {
            variant: { type: mongoose_1.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
            addedAt: { type: Date, default: Date.now }
        }
    ]
});
exports.default = (0, mongoose_1.model)("Wishlist", wishlistSchema);
