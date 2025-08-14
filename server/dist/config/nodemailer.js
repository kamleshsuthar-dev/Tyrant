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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env_1.env.SMTP_USER,
        pass: env_1.env.SMTP_PASSWORD,
    }
});
const sendEmail = (email, sub, msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: `"Tyrant" ${env_1.env.SMTP_USER}`,
            to: email,
            subject: sub,
            html: msg,
        });
        if (info && info.messageId) {
            return { success: true, messageId: info.messageId };
        }
        else {
            console.log("Failed to send email");
            return { success: false, error: "Unknown error occurred" };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false, error: "Failed to send email" };
    }
});
exports.sendEmail = sendEmail;
