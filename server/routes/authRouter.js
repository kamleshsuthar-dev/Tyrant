import express from 'express';
const authRouter = express.Router();
import { check } from 'express-validator';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import { registerUser, loginUser, logoutUser, getCurrentUser, googleAuth, resetPassword } from '../controllers/authController.js';
import userModel from "../models/user.models.js";

authRouter.post('/register',
    [
      check('name').optional().notEmpty().withMessage('Name is required'),
      check('email', 'Please include a valid email').isEmail(),
      check('password').optional().isLength({ min: 8 }).withMessage('Please enter a password with 8 or more characters'),
      check("otp").optional().isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 digits").matches(/^\d{6}$/).withMessage("OTP must contain only digits"),
    ],
    registerUser
);
authRouter.post('/login', 
    [
        check('email', 'Please include a valid email').isEmail(), 
        check('password', 'Password is required').exists(),
    ], loginUser
);

authRouter.get("/google", googleAuth);

authRouter.post('/logout', logoutUser);
authRouter.post('/reset-password', [
    check('email', 'Please include a valid email').isEmail(), 
    check('newPassword').optional().isLength({ min: 8 }).withMessage('Password must be at least 6 characters'),
    check("otp").optional().isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 digits").matches(/^\d{6}$/).withMessage("OTP must contain only digits")
], resetPassword);

authRouter.get("/isregistered", 
    async(req,res)=>{
    try {
        const {email}= req.query;
        const user = await userModel.findOne({email}).lean();
        if(!user){
            return res.status(200).send({"isAlreadyRegistered": false})
        }
        return res.status(200).send({"isAlreadyRegistered": true});
    } catch (err) {
        console.error(err);
    }
}
);
authRouter.get('/me', isLoggedIn, getCurrentUser);

export {authRouter}