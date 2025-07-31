import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, min: 1, default: 1 },
    variant: {
        color: String,
        size: String,
    },
},{ timestamps: true });

// Ensuring unique product variant for each user
cartItemSchema.index({ user: 1, product: 1, "variant.color": 1, "variant.size": 1 }, { unique: true });

export default mongoose.model("cartItem", cartItemSchema);