import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendEmail } from "config/nodemailer";
import { OTP_COOLDOWN_MS, OTP_EXPIRY_MS, SALT_ROUNDS } from "config/constants";
import { redis } from "config/redis";
export const sendOtp = async (email, userData) => {
    const otpKey = `otp:${email}`;
    const existing = await redis.ttl(otpKey);
    if (existing > 0 && existing > (OTP_EXPIRY_MS - OTP_COOLDOWN_MS) / 1000) {
        const secondsLeft = (existing - (OTP_EXPIRY_MS - OTP_COOLDOWN_MS) / 1000);
        return {
            success: false,
            message: `Please wait ${secondsLeft}s before resending OTP.`,
        };
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, SALT_ROUNDS);
    const value = JSON.stringify({ hashedOtp, userData });
    await redis.set(otpKey, value, { EX: OTP_EXPIRY_MS / 1000 });
    const subject = "OTP from Tyrant";
    const message = `<h2>Your OTP for Tyrant is ${otp}</h2>
  <p>Please note, this password is valid for 5 minutes.</p>
  <p>It should be kept private. Tyrant will never contact you via phone or email to share this code.</p>
  <p>Best Regards,</p>
  <p>Team Tyrant</p>
  `;
    const emailResponse = await sendEmail(email, subject, message);
    if (emailResponse.success) {
        return { success: true, message: "OTP sent successfully" };
    }
    else {
        await redis.del(otpKey);
        return { success: false, message: "Failed to send OTP" };
    }
};
export const verifyOtp = async (email, otp) => {
    const otpKey = `otp:${email}`;
    const recordStr = await redis.get(otpKey);
    if (!recordStr) {
        return { success: false, error: "Invalid or expired OTP" };
    }
    const { hashedOtp, userData } = JSON.parse(recordStr);
    const isValid = await bcrypt.compare(otp, hashedOtp);
    if (!isValid) {
        return { success: false, error: "Invalid OTP" };
    }
    await redis.del(otpKey);
    return { success: true, userData };
};
//# sourceMappingURL=otp.js.map