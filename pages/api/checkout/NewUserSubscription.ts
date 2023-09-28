import { NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import UserSubscription from "@/db/schemas/UserSubscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await startDB();

      const { userPackageId, userId, expirationDateTime } = req.body;

      const userSubscription = new UserSubscription({
        userPackage: userPackageId,
        user: userId,
        expirationDateTime,
      });

      await userSubscription.save();

      res.status(201).json({ success: true, data: userSubscription });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
