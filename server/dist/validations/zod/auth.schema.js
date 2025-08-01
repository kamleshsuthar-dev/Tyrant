import { z } from "zod";
export const registerUserSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
        email: z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
        otp: z.string().length(6, "OTP must be 6 digits").optional(),
    })
});
export const loginUserSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
    })
});
export const resetPasswordSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email("Invalid email"),
        otp: z.string().length(6).optional(),
        newPassword: z.string().min(6).optional(),
    }),
});
export const googleAuthSchema = z.object({
    body: z.object({
        code: z.string({ required_error: "Google auth code is required" }).min(1, "Google auth code is required"),
    }),
});
export const isRegisteredSchema = z.object({
    query: z.object({
        email: z.string().email("Invalid email"),
    }, { required_error: "Email is required" })
});
//# sourceMappingURL=auth.schema.js.map