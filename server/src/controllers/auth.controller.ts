import axios from "axios";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import userModel from "models/user.model";
import { sendOtp, verifyOtp } from "utils/otp";
import { generateToken } from "utils/generateJWT.util";
import { oauth2client } from "config/googleOAuth";
import { COOKIE_OPTIONS, SALT_ROUNDS } from "config/constants";


export default class AuthController {
    
    static async googleAuth (req: Request, res: Response)  {
      try {
        const { code } = req.query;
        if (typeof code !== "string") {
          res.status(400).json({ success: false, message: "Code query param missing or invalid" });
            return;
        }
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
          res
          .status(201)
          .json({ success: true, message: "User registered successfully" });
          return;
        }
        const token = generateToken({ email: user.email, _id: user._id });
        res.cookie("sessionId", token, COOKIE_OPTIONS);
        res
        .status(201)
        .json({ success: true, message: "User logged in successfully" });
        return;
      } catch (error) {
        console.error("Error during google login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    static async registerUser (req: Request, res: Response) {
      try {
        let { name, email, password, otp } = req.body;
        if (!otp) {
          const existingUser = await userModel.findOne({ email });
          if (existingUser){
            res.status(409).json({ success: false, error: "User already exists" });
            return;
          }
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          const result = await sendOtp(email, {
            name,
            email,
            password: hashedPassword,
          });
          if (result.success){
            res.status(201).json({ success: true, message: "OTP sent successfully" });
            return;
          }
          res.status(500).json({ success: false, error: result.message });
          return;
        }
        const otpVerification = await verifyOtp(email, otp);
        if (!otpVerification.success){
          res.status(400).json({ success: false, error: otpVerification.error });
          return;
        }
        if (!otpVerification.userData) {
          res.status(400).json({ success: false, error: "OTP verification failed: missing user data" });
           return;
        }
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
        if (
            typeof err === "object" &&
            err !== null &&
            "code" in err &&
            (err as any).code === 11000 &&
            "keyPattern" in err &&
            (err as any).keyPattern?.email
        ) {
          res
          .status(409)
          .json({ success: false, error: "User already exists" });
          return;
        }
        console.error("Error during Register User", err);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    };
    static async loginUser (req: Request, res: Response) {
      try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user){
          res.status(404).json({ success: false, error: "User not found" });
          return;
        }
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
          res.status(400).json({ success: false, error: "Password Incorrect" });
        return;
        }
        let token = generateToken({ email: user.email, _id: user._id });
        res.cookie("sessionId", token, COOKIE_OPTIONS);
        res.status(200).json({ success: true, message: "Logged in successfully" });
      } catch (err) {
        console.error("Error during user login ", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    static async logoutUser (req: Request, res: Response) {
      try {
        if (!req.cookies?.sessionId) {
          res
          .status(404)
          .json({ success: false, error: "No active session found" });
          return;
        }
        res.clearCookie("sessionId", COOKIE_OPTIONS);
        res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
        return;
      } catch (err) {
        console.error("Error during user logout", err);
        res
        .status(500)
        .json({ success: false, message: "Internal server error" });
        return;
      }
    };
    
    
    static async resetPassword (req: Request, res: Response) {
      try {
        const { email, newPassword, otp } = req.body;
        if (!otp && !newPassword) {
          const existingUser = await userModel.findOne({ email }).lean();
          if (!existingUser){
            res.status(404).json({ success: false, message: "User not found" });
            return;
          }
          const result = await sendOtp(email, { email });
          if (result.success){
            res.status(200).json({ success: true, message: "OTP sent successfully" });
            return;
          }
              res.status(500).json({ success: false, message: result.message });
          return;
        } else if (otp && !newPassword) {
          const otpVerification = await verifyOtp(email, otp);
          if (!otpVerification.success){
            res.status(400).json({ success: false, message: otpVerification?.error });
          return;
          }
          res.status(200).json({ success: true, message: "OTP verified successfully" });
          return;
        } else {
          const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
          const user = await userModel.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
          );
          if (!user){
            res.status(404).json({ success: false, error: "User not found" });
            return;
          }
          res.status(200).json({ success: true, message: "Password reset successful" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    static async getCurrentUser (req: Request, res: Response) {
      try {
        if(!req.user || !req.user.id){
          res.status(401).json({ success: false, message: "User not authenticated" });
          return;
        }
        const user = await userModel.findById(req.user.id).select("_id email name");
        res.json({ success: true, user: user });
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
    };
    static async isRegistered (req: Request ,res: Response) {
        try {
          console.log(req);
          console.log(req.query);
          
            const { email }= req.query;
            const user = await userModel.findOne({email}).lean();
            if(!user){
              res.status(200).send({"isRegistered": false})
              return; 
            }
            res.status(200).send({"isRegistered": true});
            return; 
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Internal Server Error" });
            return; 
        }
    }
    
}
