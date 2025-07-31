import {Schema, model, Document, Types} from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "customer" | "seller" | "admin";
}

const userSchema = new Schema<IUser>({
    name: { type:String, required:true },
    email: { type:String, required:true, unique:true, index: true },
    password: { type: String, required:true },
    phone: String,
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" }
},{timestamps:true})

export default model('User', userSchema)
