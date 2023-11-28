import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { generateToken } from "@/lib/token";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: any) {
  try {
    const body = await req.json();
    await startDB();

    const email = body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { result: "User not found", success: false },
        { status: 404 }
      );
    }

    const token = generateToken({ email: email });

    // TODO: Send password reset email with token
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const senderEmail = process.env.SENDER_EMAIL;

    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: senderEmail, // generated brevo user
        pass: process.env.SMTP_API_KEY, // generated brevo password
      },
    });
    let info = await transporter.sendMail({
      from: senderEmail, // sender address
      to: email, // list of receivers
      subject: `Password reset link | CareerBooster.AI`, // Subject line
      html: `<h3>You Requested to change your password </h3>
               <p>Here is your password reset link: <a href="${appUrl}/change-password?token=${token}">Reset Password</a></p>
                 <br />
               <p>CareerBooster.AI</p>
              `,
    });
    if (info.messageId) {
      return NextResponse.json(
        { result: "Email sent successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Server Error", success: false },
      { status: 500 }
    );
  }
}
