import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import startDB from "@/lib/db";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
import Mailjet from "node-mailjet";

export async function POST(req: Request) {
  try {
    await startDB();

    const { email, message, name, phone } = await req.json();
    const senderEmail =
      process.env.SENDER_EMAIL || "contact@consultantsperhour.com";
    const receiverEmail =
      process.env.RECEIVER_EMAIL || "info@consultantsperhour.com";

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
              Email: receiverEmail,
              Name: "CareerBooster Admin",
            },
          ],
          Subject: `${name} via Contact us form | CareerBooster.AI`,
          TextPart: `Email: ${email}\n Phone: ${phone}\n Message: ${message} \n Name: ${name}`,
          HTMLPart: `<h3>${name} contacted via Contact us Form </h3>
              <p>{message}</p>
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
        },
      ],
    });
    request
      .then((result) => {
        return NextResponse.json(
          {
            test: result.body,
            success: true,
          },
          { status: 201 }
        );

        //    res.status(201).json({ test: result.body });
      })
      .catch((err) => {
        return NextResponse.json(
          {
            test: err.statusCode,
            success: false,
          },
          { status: 500 }
        );
        //    res.status(500).json({ test: err.statusCode });
      });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error",
        success: false,
      },
      { status: 500 }
    );

    //    console.error(error);
    //    res.status(500).json({ success: false, error: "Server Error" });
  }
}
