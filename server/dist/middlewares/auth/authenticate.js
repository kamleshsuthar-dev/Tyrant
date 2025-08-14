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
exports.verifyToken = verifyToken;
exports.attachUserIfExists = attachUserIfExists;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
function decodeSession(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.sessionId;
        if (!token || !env_1.env.JWT_SECRET)
            return null;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            const user = yield user_model_1.default.findOne({ email: decoded.email }).select("-password");
            return user || null;
        }
        catch (_a) {
            return null;
        }
    });
}
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield decodeSession(req);
        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        req.user = user;
        next();
    });
}
function attachUserIfExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield decodeSession(req);
        if (user)
            req.user = user;
        next();
    });
}
