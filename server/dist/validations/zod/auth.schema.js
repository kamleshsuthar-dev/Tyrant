"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegisteredSchema = exports.googleAuthSchema = exports.resetPasswordSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(1, "Name is required"),
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: zod_1.z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
        otp: zod_1.z.string().length(6, "OTP must be 6 digits").optional(),
    })
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: zod_1.z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
    })
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email"),
        otp: zod_1.z.string().length(6).optional(),
        newPassword: zod_1.z.string().min(6).optional(),
    }),
});
exports.googleAuthSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({ required_error: "Google auth code is required" }).min(1, "Google auth code is required"),
    }),
});
exports.isRegisteredSchema = zod_1.z.object({
    query: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email"),
    }, { required_error: "Email is required" })
});
