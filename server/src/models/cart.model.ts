import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem {
  variant: Types.ObjectId;
  quantity: number;
  savedForLater?: boolean;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  items: [
    {
      variant: { type: Schema.Types.ObjectId, ref: "ProductVariant", required: true },
      quantity: { type: Number, default: 1 },
      savedForLater: { type: Boolean, default: false },
    },
  ],
}, { timestamps: true });

export default model<ICart>("Cart", cartSchema);