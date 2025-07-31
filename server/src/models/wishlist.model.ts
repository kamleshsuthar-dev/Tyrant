import { Schema, model, Document, Types } from "mongoose";

export interface IWishlistItem {
  variant: Types.ObjectId;
  addedAt?: Date;
}

export interface IWishlist extends Document {
  user: Types.ObjectId;
  items: IWishlistItem[];
}

const wishlistSchema = new Schema<IWishlist>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [
    {
      variant: { type: Schema.Types.ObjectId, ref: "ProductVariant", required: true },
      addedAt: { type: Date, default: Date.now }
    }
  ]
});

export default model<IWishlist>("Wishlist", wishlistSchema);