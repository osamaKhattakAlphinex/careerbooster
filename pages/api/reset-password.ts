import { NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { generateToken } from "@/lib/token";
import Mailjet from "node-mailjet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await startDB();

      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      const token = generateToken({ email });

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
            Subject: `Password reset link | CareerBooster.ai`,
            TextPart: `Here is your password reset link: <a href="${appUrl}/change-password?token=${token}">Reset Password</a>`,
            HTMLPart: `<h3>You Requested to change your password </h3>
              <p>Here is your password reset link: <a href="${appUrl}/change-password?token=${token}">Reset Password</a></p>
                <br />
                <p>CareerBooster.ai</p>
              `,
          },
        ],
      });
      request
        .then((result) => {
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, error: "Unable to send email" });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
