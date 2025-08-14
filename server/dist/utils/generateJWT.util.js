"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function generateToken(user) {
    if (!env_1.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    let token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, env_1.env.JWT_SECRET);
    return token;
}
;
