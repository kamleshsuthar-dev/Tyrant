import { Schema, model } from "mongoose";
const wishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
        {
            variant: { type: Schema.Types.ObjectId, ref: "ProductVariant", required: true },
            addedAt: { type: Date, default: Date.now }
        }
    ]
});
export default model("Wishlist", wishlistSchema);
//# sourceMappingURL=wishlist.model.js.map