import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { generateToken } from "@/lib/token";
import Mailjet from "node-mailjet";
import { NextResponse } from "next/server";

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
    const senderEmail = process.env.SENDER_EMAIL || "info@careerbooster.ai";
    const receiverEmail =
      process.env.RECEIVER_EMAIL || "m.sulemankhan@hotmail.com";

    const mailjet = new Mailjet({
      apiKey: process.env.SMTP_API_KEY || "your-api-key",
      apiSecret: process.env.SMTP_SECRET_KEY || "your-api-secret",
    });
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: "CareerBooster",
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: `Password reset link | CareerBooster.AI`,
          TextPart: `Here is your password reset link: <a href="${appUrl}/change-password?token=${token}">Reset Password</a>`,
          HTMLPart: `<h3>You Requested to change your password </h3>
              <p>Here is your password reset link: <a href="${appUrl}/change-password?token=${token}">Reset Password</a></p>
                <br />
                <p>CareerBooster.AI</p>
              `,
        },
      ],
    });
    request
      .then((result) => {
        return NextResponse.json({ success: true }, { status: 200 });
      })
      .catch((err) => {
        return NextResponse.json(
          { result: "Unable to send email", success: false },
          { status: 500 }
        );
      });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Server Error", success: false },
      { status: 500 }
    );
  }
}
