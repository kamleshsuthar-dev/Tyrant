import crypto from 'crypto';
import { sendEmail } from '../config/nodemailer.js';
import { validationResult } from 'express-validator';
import OtpModel from '../models/otp.models.js';
import { generateToken } from '../utils/generateToken.js';
import { COOKIE_OPTIONS } from '../config/constants.js';
import { SALT_ROUNDS } from '../config/constants.js';


const generateOtp = () => crypto.randomInt(100000, 999999).toString();
export const sendOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ success: false, error: errors.array()[0].msg });
        const { email } = req.body;
        const otp = generateOtp();
        await OtpModel.deleteMany({ email });
        await OtpModel.create({ email, otp });
        const subject = "Your OTP Code";
        const message = `<h1>Your OTP code is ${otp}</h1>`;
        const emailResponse = await sendEmail(email, subject, message);
        if (emailResponse.success) {
            return res.status(201).json({ success: true, message: "OTP sent successfully" });
        } else {
            return res.status(500).json({ success: false, message: "Failed to send OTP" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error'});
    }
}
export const verifyOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ success: false, error: errors.array()[0].msg });
        const { email, otp } = req.body;
        const otpRecord = await OtpModel.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        await OtpModel.deleteMany({ email });
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const token = generateToken({ email: user.email, _id: user._id });
        res.cookie("sessionId", token, COOKIE_OPTIONS);
        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error'});
    }
}