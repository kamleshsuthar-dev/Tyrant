import userModels from "../models/user.models.js";
import jwt from "jsonwebtoken"; 

export async function isLoggedIn(req,res,next){
    if(!req.cookies.sessionId){
        return res.status(401)
        .json({ cookies: req.cookies ,success: false, message: "User not authenticated. Please log in." });
    }
    try {
        let decoded = jwt.verify(req.cookies.sessionId, process.env.JWT_KEY);
        let user = await userModels.findOne({email:decoded.email}).select("-password");
        if(!user){
            return res.status(401)
            .json({ success: false, message: "Invalid session. User not found." });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401)
        .json({ success: false, message: "Invalid or expired token." });
    }
}
export async function ifLoggedIn(req,res,next){
    if(!req.cookies.sessionId){
        return next();
    }
    try {
        let decoded = jwt.verify(req.cookies.sessionId, process.env.JWT_KEY);
        let user = await userModels.findOne({email:decoded.email}).select("-password");
        if(!user){
           return next();
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401)
        .json({ success: false, message: "Invalid or expired token." });
    }
}
