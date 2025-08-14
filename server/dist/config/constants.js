"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_COOLDOWN_MS = exports.OTP_EXPIRY_MS = exports.SALT_ROUNDS = exports.COOKIE_OPTIONS = void 0;
const env_1 = require("../config/env");
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env_1.env.NODE_ENV === 'production',
    sameSite: env_1.env.IS_SAME_SITE || 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 24*7 ~ 7 Days
};
exports.SALT_ROUNDS = 8;
exports.OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
exports.OTP_COOLDOWN_MS = 3 * 1000; // 3 seconds
