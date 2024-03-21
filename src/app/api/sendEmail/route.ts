import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import startDB from "@/lib/db";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import Contact from "@/db/schemas/Contact";

export async function POST(req: Request) {
  try {
    await startDB();

    const { email, message, name, phone } = await req.json();
    const receiverEmail = process.env.RECEIVER_EMAIL;
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: receiverEmail, // generated brevo user
        pass: process.env.SMTP_API_KEY, // generated brevo password
      },
    });
    let info = await transporter.sendMail({
      from: email, // sender address
      to: receiverEmail, // list of receivers
      subject: `${name} via Contact us form | CareerBooster.AI`, // Subject line
      html: ` <h3>${name} contacted via Contact us Form </h3>
               <p>${message}</p>
                 <br />
                 <p>Phone: ${phone}</p>
                 <br />
                 <p>Email: ${email}</p>
                 <br />
                 <p>Name: ${name}</p>
                 <br />
                 <p>Regards,</p>
                 <p>CareerBooster.AI</p>
               `,
    });
    if (info.messageId) {
      const contactEntry = new Contact({
        email,
        message,
        name,
        phone,
      });

      await contactEntry.save();

      return NextResponse.json(
        { result: "Message sent successfully", success: true },
        { status: 200 }
      );
    }
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
