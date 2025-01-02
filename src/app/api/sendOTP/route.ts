import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import { OtpEntryType, makeOTPEntry } from "@/helpers/makeOTPEntry";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

let emailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style media="all" type="text/css">
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        text-align: center;
        background-color: #f4f5f6;
      }
      table {
        margin-left: auto;
        margin-right: auto;
        border-collapse: collapse;
        border-spacing: 0;
      }
      .container {
        background-color: #030712;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #030712;
        color: #eaebed;
        display: flex;
      }
      .header img {
        width: 200px;
      }
      .content {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        padding: 20px;
        border-top: 6px solid #e1e661;
        background-color: #0e0d0d;
      }
      .welcome-note p {
        color: #eaebed;
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        opacity: 0.7;
      }
      .instruction-text p {
        color: #d1d1d1;
        opacity: 0.6;
        margin: 10px 0;
        font-size: 0.875rem;
      }
      .otp-code {
        border-radius: 5px;
        padding: 10px 0;
        background-color: #000;
        text-align: center;
      }
      .otp-code code {
        color: #e1e661;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 6px;
      }
      .info-text span {
        padding-top: 20px;
        color: #d1d1d1;
        opacity: 0.9;
        color: #eaebed;
        display: block;
        font-size: 14px;
        text-align: center;
      }
      .footer {
        padding: 10px;
        font-size: 0.875rem;
        text-align: center;
        background-color: #030712;
        color: #eaebed;
        opacity: 0.6;
      }
      .footer a {
        color: #e1e661;
        font-weight: 500;
        text-decoration: none;
        margin-left: 10px;
      }
      .footer a:hover{
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td class="container">
          <div class="header">
            <img src="https://www.careerbooster.ai/dark_logo.png" />
          </div>
          <div class="content">
            <div class="welcome-note"><p>You are nearly there!</p></div>
            <div class="instruction-text">
              <p>
                Copy and paste your one-time password in Careerbooster.ai to
                login.
              </p>
            </div>
            <div class="otp-code"><code>{{{otp}}}</code></div>
            <div class="info-text"><span>Code expires in 10 minutes</span></div>
          </div>
          <div class="footer">
            <p>23 The Atria 219 Bath Road Slough SL1 4BF, United Kingdom</p>
            <p>+44 7933 951034</p>
            <p>
              Have any questions?<a class="contact-link" href="https://www.careerbooster.ai/contact"
                >Contact</a
              >
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>

`
export async function POST(req: NextRequest) {
  try {
    if (process.env.NEXT_APP_STATE === "Production") {
      const otp = Math.floor(Math.random() * 900000) + 100000;
      const { email } = await req.json();
      await startDB()
      const user = await User.findOne({ email });
      if(!user) {
        return NextResponse.json(
          {
            error: "User not found",
            success: false,
          },
          { status: 404 }
        );
      }
      
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

      emailTemplate = emailTemplate.replace("{{{otp}}}", otp.toString());

      await transporter.sendMail({
        from: senderEmail, // sender address
        to: email, // list of receivers
        subject: `Your verification code for Login at CareerBooster.AI`, // Subject line
        html: emailTemplate,
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
