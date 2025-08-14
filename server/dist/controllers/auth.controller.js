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
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const otp_1 = require("../utils/otp");
const generateJWT_util_1 = require("../utils/generateJWT.util");
const googleOAuth_1 = require("../config/googleOAuth");
const constants_1 = require("../config/constants");
class AuthController {
    static googleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.query;
                if (typeof code !== "string") {
                    res.status(400).json({ success: false, message: "Code query param missing or invalid" });
                    return;
                }
                const googleRes = yield googleOAuth_1.oauth2client.getToken(code);
                googleOAuth_1.oauth2client.setCredentials(googleRes.tokens);
                const userRes = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
                const { email, name } = userRes.data;
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    const user = yield user_model_1.default.create({ email, name });
                    const token = (0, generateJWT_util_1.generateToken)({ email: user.email, _id: user._id });
                    res.cookie("sessionId", token, constants_1.COOKIE_OPTIONS);
                    res
                        .status(201)
                        .json({ success: true, message: "User registered successfully" });
                    return;
                }
                const token = (0, generateJWT_util_1.generateToken)({ email: user.email, _id: user._id });
                res.cookie("sessionId", token, constants_1.COOKIE_OPTIONS);
                res
                    .status(201)
                    .json({ success: true, message: "User logged in successfully" });
                return;
            }
            catch (error) {
                console.error("Error during google login:", error);
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        });
    }
    ;
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let { name, email, password, otp } = req.body;
                if (!otp) {
                    const existingUser = yield user_model_1.default.findOne({ email });
                    if (existingUser) {
                        res.status(409).json({ success: false, error: "User already exists" });
                        return;
                    }
                    const hashedPassword = yield bcrypt_1.default.hash(password, constants_1.SALT_ROUNDS);
                    const result = yield (0, otp_1.sendOtp)(email, {
                        name,
                        email,
                        password: hashedPassword,
                    });
                    if (result.success) {
                        res.status(201).json({ success: true, message: "OTP sent successfully" });
                        return;
                    }
                    res.status(500).json({ success: false, error: result.message });
                    return;
                }
                const otpVerification = yield (0, otp_1.verifyOtp)(email, otp);
                if (!otpVerification.success) {
                    res.status(400).json({ success: false, error: otpVerification.error });
                    return;
                }
                if (!otpVerification.userData) {
                    res.status(400).json({ success: false, error: "OTP verification failed: missing user data" });
                    return;
                }
                const user = yield user_model_1.default.create({
                    name: otpVerification.userData.name,
                    email: otpVerification.userData.email,
                    password: otpVerification.userData.password,
                });
                let token = (0, generateJWT_util_1.generateToken)(user);
                res.cookie("sessionId", token, constants_1.COOKIE_OPTIONS);
                res
                    .status(201)
                    .json({ success: true, message: "User registered successfully" });
            }
            catch (err) {
                if (typeof err === "object" &&
                    err !== null &&
                    "code" in err &&
                    err.code === 11000 &&
                    "keyPattern" in err &&
                    ((_a = err.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
                    res
                        .status(409)
                        .json({ success: false, error: "User already exists" });
                    return;
                }
                console.error("Error during Register User", err);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        });
    }
    ;
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                let user = yield user_model_1.default.findOne({ email: email });
                if (!user) {
                    res.status(404).json({ success: false, error: "User not found" });
                    return;
                }
                let isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    res.status(400).json({ success: false, error: "Password Incorrect" });
                    return;
                }
                let token = (0, generateJWT_util_1.generateToken)({ email: user.email, _id: user._id });
                res.cookie("sessionId", token, constants_1.COOKIE_OPTIONS);
                res.status(200).json({ success: true, message: "Logged in successfully" });
            }
            catch (err) {
                console.error("Error during user login ", err);
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        });
    }
    ;
    static logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.sessionId)) {
                    res
                        .status(404)
                        .json({ success: false, error: "No active session found" });
                    return;
                }
                res.clearCookie("sessionId", constants_1.COOKIE_OPTIONS);
                res
                    .status(200)
                    .json({ success: true, message: "Logged out successfully" });
                return;
            }
            catch (err) {
                console.error("Error during user logout", err);
                res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
                return;
            }
        });
    }
    ;
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, newPassword, otp } = req.body;
                if (!otp && !newPassword) {
                    const existingUser = yield user_model_1.default.findOne({ email }).lean();
                    if (!existingUser) {
                        res.status(404).json({ success: false, message: "User not found" });
                        return;
                    }
                    const result = yield (0, otp_1.sendOtp)(email, { email });
                    if (result.success) {
                        res.status(200).json({ success: true, message: "OTP sent successfully" });
                        return;
                    }
                    res.status(500).json({ success: false, message: result.message });
                    return;
                }
                else if (otp && !newPassword) {
                    const otpVerification = yield (0, otp_1.verifyOtp)(email, otp);
                    if (!otpVerification.success) {
                        res.status(400).json({ success: false, message: otpVerification === null || otpVerification === void 0 ? void 0 : otpVerification.error });
                        return;
                    }
                    res.status(200).json({ success: true, message: "OTP verified successfully" });
                    return;
                }
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(newPassword, constants_1.SALT_ROUNDS);
                    const user = yield user_model_1.default.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
                    if (!user) {
                        res.status(404).json({ success: false, error: "User not found" });
                        return;
                    }
                    res.status(200).json({ success: true, message: "Password reset successful" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        });
    }
    ;
    static getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || !req.user.id) {
                    res.status(401).json({ success: false, message: "User not authenticated" });
                    return;
                }
                const user = yield user_model_1.default.findById(req.user.id).select("_id email name");
                res.json({ success: true, user: user });
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Server error");
            }
        });
    }
    ;
    static isRegistered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                console.log(req.query);
                const { email } = req.query;
                const user = yield user_model_1.default.findOne({ email }).lean();
                if (!user) {
                    res.status(200).send({ "isRegistered": false });
                    return;
                }
                res.status(200).send({ "isRegistered": true });
                return;
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: "Internal Server Error" });
                return;
            }
        });
    }
}
exports.default = AuthController;
