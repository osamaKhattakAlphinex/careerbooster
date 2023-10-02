import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import UserPackage, { UserPackageData } from "@/db/schemas/UserPackage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    try {
      await startDB();

      const { type, title, amount, status, features, category, limit } =
        req.body as UserPackageData;

      const userPackage = new UserPackage({
        type,
        title,
        amount,
        status,
        features,
        category,
        limit,
      });

      await userPackage.save();

      return res.status(201).json({ success: true, userPackage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Not Signed in
    return res.status(401).json({ message: "forbidden" });
  }
};

export default handler;
