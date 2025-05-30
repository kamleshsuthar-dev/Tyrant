export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.IS_SAME_SITE || 'Lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  };
export const SALT_ROUNDS = 8;
export const OTP_EXPIRY_MS = 5 * 60 * 1000;
export const OTP_COOLDOWN_MS = 3 * 1000; // 3 seconds