import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    orderItems: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true, min: 1 },
        variant: {
            color: { type: String, required: true },
            size: { type: String, required: true },
        },
        amount: { type: Number, required: true, min: 0 },
        refundRequested: { type: Boolean, default: false },
        refundStatus: { type: String, enum: ["not requested", "pending", "approved", "rejected"], default: "not requested" },
        refundAmount: { type: Number, default: 0 },
        refundMethod: { type: String, enum: ["Original Payment Method", "Store Credit", "Bank Transfer"], default: "Original Payment Method" },
        returnDate: { type: Date, default: null },
    }],
    orderAddress: {
        nickName: {type:String, required:true},
        landmark: {type:String, required:true},
        addressLine: {type:String, required:true},
        locality: {type:String, required:true},
        pincode: {type:Number, required:true},
        city: {type:String, required:true},
        state: {type:String, required:true},
    },
    paymentMethod: { type: String, enum: ["credit card", "debit card", "net banking", "UPI", "cash on delivery"], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    isPaid: { type: Boolean, default: false, required: true },
    orderStatus: { type: String, enum: ["ordered", "shipped", "delivered", "cancelled"], default: "ordered", required: true },
}, { timestamps: true });

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ productId: 1 });

export default mongoose.model('order', orderSchema);
