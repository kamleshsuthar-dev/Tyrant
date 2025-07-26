import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, "Chota hai tera").max(50, "Bahut bada hai tera"),
  email: z.email("Invalid email address"),
  password: z.string().trim().min(8, "At least 8 characters")
,
});

export const LoginSchema = z.object({
     email: z.email("Invalid email address"),
  password: z.string().trim().min(8, "At least 8 characters")
,
})

export const ForgotPasswordSchema = z.object({
         email: z.email("Invalid email address"),
})

export const UpdatePasswordSchema = z.object({
         password: z.string().trim().min(8, "At least 8 characters"),
         confirmPassword: z.string().trim().min(8, "At least 8 characters")
})
.refine((data) => data.password === data.confirmPassword,{
    message: "Password Not Matched",
    path: ["confirmPassword"]
})