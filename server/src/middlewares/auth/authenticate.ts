import userModels from "models/user.model";
import jwt from "jsonwebtoken"; 
import { Request, Response, NextFunction } from "express";
import { env } from "config/env"

async function decodeSession(req: Request): Promise<any | null> {
    const token = req.cookies.sessionId;
    if (!token || !env.JWT_SECRET) return null;

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
        const user = await userModels.findOne({ email: decoded.email }).select("-password");
        return user || null;
    } catch {
        return null;
    }
}

export async function verifyToken(req: Request,res: Response, next: NextFunction): Promise<void>{
    const user = await decodeSession(req);
    if (!user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return; 
    }
    req.user = user;
    next();
}

export async function attachUserIfExists(req: Request,res: Response, next: NextFunction): Promise<void>{
    const user = await decodeSession(req);
    if (user) req.user = user;
    next();
}
