import { Schema, model } from "mongoose";
const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    items: [
        {
            variant: { type: Schema.Types.ObjectId, ref: "ProductVariant", required: true },
            quantity: { type: Number, default: 1 },
            savedForLater: { type: Boolean, default: false },
        },
    ],
}, { timestamps: true });
export default model("Cart", cartSchema);
//# sourceMappingURL=cart.model.js.map