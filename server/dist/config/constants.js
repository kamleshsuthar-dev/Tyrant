import { env } from "config/env";
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.IS_SAME_SITE || 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 24*7 ~ 7 Days
};
export const SALT_ROUNDS = 8;
export const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
export const OTP_COOLDOWN_MS = 3 * 1000; // 3 seconds
//# sourceMappingURL=constants.js.map