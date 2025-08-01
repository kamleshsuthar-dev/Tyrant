import { Schema, model } from "mongoose";
const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
    postalCode: { type: String, required: true },
    type: { type: String, enum: ["home", "work", "other"], default: "home" },
    isDefault: { type: Boolean, default: false },
}, { timestamps: true });
addressSchema.index({ user: 1, isDefault: 1 });
export default model("Address", addressSchema);
//# sourceMappingURL=address.model.js.map