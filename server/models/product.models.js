import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pName: {type: String, required: true,},
    pDescription: {type: String, required: true,},
    pCategory: { type: mongoose.Schema.Types.ObjectId, ref: "categories", index:true },
    pPrice: {type: Number, required: true,},
    pQuantity: { type: Number, default: 0 },
    pImages: { type: Array, required: true },
    pOffer: { type: String, default: 0 },
    pStatus: {type: String, required: true,},
    pReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review", index:true }],
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    pSold: {type: Number, default: 0,},
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
