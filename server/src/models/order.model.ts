import { Document, Schema, model, Types } from "mongoose";

export interface IOrderItem {
  variant: Types.ObjectId;
  productSnapshot: {
    name: string;
    brand: string;
    images: string[];
    price: number;
    discount: number;
    finalPrice: number;
  };
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  address: string;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "card" | "upi";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
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

export default model<IOrder>("Order", orderSchema);