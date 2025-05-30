import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

export const sendEmail = async (email,sub,msg)=>{
 try {
    const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: sub,
        html: msg,
    });
    if (info && info.messageId) {
        console.log("Email sent successfully:", info.messageId);
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