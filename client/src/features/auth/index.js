import { lazy } from "react";

// const Login = lazy(() => import ("@/features/auth/auth/login/Login"));
// const Register = lazy(() => import ("@/features/auth/auth/register/Register"));
import Login from "@/features/auth/auth/login/Login";
import Register from "./auth/register/Register";
import GoogleAuth from "@/features/auth/auth/GoogleAuth";

const OtpForResetPass = lazy(() => import("@/features/auth/auth/forgotPassword/OtpForResetPass"));
const ForgotPasswordForm = lazy(() => import("@/features/auth/auth/forgotPassword/ForgotPasswordForm"));
const SetPassword = lazy(() => import("@/features/auth/auth/SetPassword"));
const UpdatePassword = lazy(() => import("@/features/auth/auth/forgotPassword/UpdatePassword"));

const OtpVerification = lazy(() => import("@/features/auth/auth/register/OtpVerification"));
// const GoogleAuth = lazy(() => import("@/features/auth/auth/GoogleAuth"));


export{
    ForgotPasswordForm,
    OtpForResetPass,
    UpdatePassword,

    Login ,

    Register,
    OtpVerification,

    GoogleAuth,
    SetPassword

}