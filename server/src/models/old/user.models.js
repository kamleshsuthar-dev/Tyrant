import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true, index: true },
    password: { type:String },
    contact: {type:String, default: ""},
    gender: {type:String, enum:["male", "female"], default: "male"},
    address: [{
        nickName: {type:String, required:true},
        landmark: {type:String, required:true},
        addressLine: {type:String, required:true},
        locality: {type:String, required:true},
        pincode: {type:Number, required:true},
        city: {type:String, required:true},
        state: {type:String, required:true},
        type:{type:String, enum: ["home", "work", "other"], required:true},
        isDefault:{type:Boolean, required:true, default:false}
    }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "cartItems" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }] 
},{timestamps:true})

export default mongoose.model('user', userSchema)
