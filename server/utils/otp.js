import crypto from "crypto";
import OtpModel from "../models/otp.models.js";
import { sendEmail } from "../config/nodemailer.js"; // your nodemailer function
import { OTP_COOLDOWN_MS } from "../config/constants.js";

export const sendOtp = async (email, userData) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const existingOtp = await OtpModel.findOne({ email }).lean();
  if (existingOtp) {
    const elapsedMs = Date.now() - new Date(existingOtp.createdAt).getTime();
    const cooldownMs = OTP_COOLDOWN_MS; 

    if (elapsedMs < cooldownMs) {
      const secondsLeft = Math.ceil((cooldownMs - elapsedMs) / 1000);
      return {
        success: false,
        message: `Please wait ${secondsLeft}s before resending OTP.`,
      };
    }
  }
  await OtpModel.deleteMany({ email });
  await OtpModel.create({
    email,
    otp,
    userData: userData || null,
  });
  const subject = "Your OTP Code";
  const message = `<h1>Your OTP code is ${otp}</h1>`;
  const emailResponse = await sendEmail(email, subject, message);
  if (emailResponse.success)
    return { success: true, message: "OTP sent successfully" };
  return { success: false, message: "Failed to send OTP" };
};
export const verifyOtp = async (email, otp) => {
  const record = await OtpModel.findOneAndDelete({ email, otp });
  if (!record) return { success: false, error: "Invalid or expired OTP" };
  return { success: true, userData: record.userData };
};
