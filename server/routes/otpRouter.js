import express from "express";
const otpRouter = express.Router();
import { check } from 'express-validator';
import { sendOtp, verifyOtp } from "../controllers/otpController.js";

otpRouter.post("/send-otp", [check('email', 'Please include a valid email').isEmail()] ,sendOtp);
otpRouter.post("/verify-otp", [
    check('email', 'Please include a valid email').isEmail(),
    check('otp', 'OTP is required').exists()
] ,verifyOtp);

export { otpRouter };
