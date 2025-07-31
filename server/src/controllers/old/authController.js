import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import userModel from "../models/user";
import { validationResult } from "express-validator";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import { COOKIE_OPTIONS, SALT_ROUNDS } from "../config/constants.js";
import { sendOtp, verifyOtp } from "../utils/otp.js";



export const googleAuth = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name } = userRes.data;
    const user = await userModel.findOne({ email });
    if (!user) {
      const user = await userModel.create({ email, name });
      const token = generateToken({ email: user.email, _id: user._id });
      res.cookie("sessionId", token, COOKIE_OPTIONS);
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    }
    const token = generateToken({ email: user.email, _id: user._id });
    res.cookie("sessionId", token, COOKIE_OPTIONS);
    return res
      .status(201)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during google login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ success: false, error: errors.array()[0].msg });
    let { name, email, password, otp } = req.body;
    if (!otp) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser)
        return res
          .status(409)
          .json({ success: false, error: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const result = await sendOtp(email, {
        name,
        email,
        password: hashedPassword,
      });
      if (result.success)
        return res
          .status(201)
          .json({ success: true, message: "OTP sent successfully" });
      return res.status(500).json({ success: false, error: result.message });
    }
    const otpVerification = await verifyOtp(email, otp);
    if (!otpVerification.success)
      return res
        .status(400)
        .json({ success: false, error: otpVerification.error });
    const user = await userModel.create({
      name: otpVerification.userData.name,
      email: otpVerification.userData.email,
      password: otpVerification.userData.password,
    });
    let token = generateToken(user);
    res.cookie("sessionId", token, COOKIE_OPTIONS);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res
        .status(409)
        .json({ success: false, error: "User already exists" });
    }
    console.error("Error during Register User", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, error: errors.array()[0].msg });
    }
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    let isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(400)
        .json({ success: false, error: "Password Incorrect" });
    let token = generateToken({ email: user.email, _id: user._id });
    res.cookie("sessionId", token, COOKIE_OPTIONS);
    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    console.error("Error during user login ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies?.sessionId) {
      return res
        .status(404)
        .json({ success: false, error: "No active session found" });
    }
    res.clearCookie("sessionId", COOKIE_OPTIONS);
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during user logout", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// resetPassword on 04-05-2025 OTP verification is remaining

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, error: errors.array()[0].msg });
    }
    const { email, newPassword, otp } = req.body;

    if (!otp && !newPassword) {
      const existingUser = await userModels.findOne({ email }).lean();
      if (!existingUser)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      const result = await sendOtp(email, { email });
      if (result.success)
        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      return res.status(500).json({ success: false, message: result.message });
    } else if (otp && !newPassword) {
      const otpVerification = await verifyOtp(email, otp);
      if (!otpVerification.success)
        return res
          .status(400)
          .json({ success: false, message: otpVerification.error });
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      const user = await userModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      if (!user)
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      res
        .status(200)
        .json({ success: true, message: "Password reset successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("_id email name");
    res.json({ success: true, user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
