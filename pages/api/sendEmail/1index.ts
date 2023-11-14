import { NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import Mailjet from "node-mailjet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await startDB();

      const { email, message, name, phone } = req.body;
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
          res.status(201).json({ test: result.body });
        })
        .catch((err) => {
          res.status(500).json({ test: err.statusCode });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
