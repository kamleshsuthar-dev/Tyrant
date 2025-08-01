import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            variant: { type: Schema.Types.ObjectId, ref: "ProductVariant", required: true },
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
export default model("Order", orderSchema);
//# sourceMappingURL=order.model.js.map