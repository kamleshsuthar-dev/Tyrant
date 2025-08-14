import nodemailer from "nodemailer"
import { env } from "../config/env";

interface EmailResponse {
    success: boolean;
    messageId?: string;
    error?: string;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
    }
});

export const sendEmail = async (email: string,sub: string,msg: string): Promise<EmailResponse> =>{
 try {
    const info = await transporter.sendMail({
        from: `"Tyrant" ${env.SMTP_USER}`,
        to: email,
        subject: sub,
        html: msg,
    });
    if (info && info.messageId) {
        return { success: true, messageId: info.messageId };
    } else {
        console.log("Failed to send email");
        return { success: false, error: "Unknown error occurred" };
    }
 } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to send email" };
 }
} 