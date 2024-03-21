import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import { OtpEntryType, makeOTPEntry } from "@/helpers/makeOTPEntry";

export async function POST(req: Request) {
  try {
    if(process.env.NEXT_APP_STATE === 'Production'){
      const otp = Math.floor(Math.random() * 900000) + 100000;
      const { email } = await req.json();
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
      let otpEntry: OtpEntryType = {
        email: email,
        otp: otp,
        expiry: Date.now() + 10 * 60 * 1000,
      };
      await makeOTPEntry(otpEntry);
  
      await transporter.sendMail({
        from: senderEmail, // sender address
        to: email, // list of receivers
        subject: `Your verification code for Login at CareerBooster.AI`, // Subject line
        html: ` <h3>Verification Code </h3>
                 <p>${otp}</p>
                   <h4>Regards,</h4>
                   <h4>CareerBooster.AI</h4>
                 `,
      }); 
    }
    return NextResponse.json(
      { result: "Email sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
