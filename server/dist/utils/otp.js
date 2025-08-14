"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("../config/nodemailer");
const constants_1 = require("../config/constants");
const redis_1 = require("../config/redis");
const sendOtp = (email, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const otpKey = `otp:${email}`;
    const existing = yield redis_1.redis.ttl(otpKey);
    // if (existing > 0 && existing > (OTP_EXPIRY_MS - OTP_COOLDOWN_MS)/1000) {
    //   const secondsLeft = (existing - (OTP_EXPIRY_MS - OTP_COOLDOWN_MS)/1000);
    //   return {
    //     success: false,
    //     message: `Please wait ${secondsLeft}s before resending OTP.`,
    //   };
    // }
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const hashedOtp = yield bcrypt_1.default.hash(otp, constants_1.SALT_ROUNDS);
    const value = JSON.stringify({ hashedOtp, userData });
    yield redis_1.redis.set(otpKey, value, { EX: constants_1.OTP_EXPIRY_MS / 1000 });
    const subject = "OTP from Tyrant";
    const message = `<h2>Your OTP for Tyrant is ${otp}</h2>
  <p>Please note, this password is valid for 5 minutes.</p>
  <p>It should be kept private. Tyrant will never contact you via phone or email to share this code.</p>
  <p>Best Regards,</p>
  <p>Team Tyrant</p>
  `;
    const emailResponse = yield (0, nodemailer_1.sendEmail)(email, subject, message);
    if (emailResponse.success) {
        return { success: true, message: "OTP sent successfully" };
    }
    else {
        yield redis_1.redis.del(otpKey);
        return { success: false, message: "Failed to send OTP" };
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const otpKey = `otp:${email}`;
    // const recordStr = await redis.get(otpKey);
    const recordStr = "temp assignment to execute build process wil fix it later";
    if (!recordStr) {
        return { success: false, error: "Invalid or expired OTP" };
    }
    const { hashedOtp, userData } = JSON.parse(recordStr);
    const isValid = yield bcrypt_1.default.compare(otp, hashedOtp);
    if (!isValid) {
        return { success: false, error: "Invalid OTP" };
    }
    yield redis_1.redis.del(otpKey);
    return { success: true, userData };
});
exports.verifyOtp = verifyOtp;
