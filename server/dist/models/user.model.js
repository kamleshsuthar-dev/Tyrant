import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" }
}, { timestamps: true });
export default model('User', userSchema);
//# sourceMappingURL=user.model.js.map