import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5, index:true },
    review: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
},{timestamps: true});

export default mongoose.model("review", reviewSchema);
