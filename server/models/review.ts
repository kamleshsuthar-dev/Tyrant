import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  product: Types.ObjectId;
  user: Types.ObjectId;
  order: Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  media?: string[]; // image or video URLs
  likes?: number;
  dislikes?: number;
  isVerified: boolean;
  isPublished: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    comment: { type: String, required: true },
    media: [{ type: String }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false }, // true if user bought the product
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });

export default model("Review", reviewSchema);
