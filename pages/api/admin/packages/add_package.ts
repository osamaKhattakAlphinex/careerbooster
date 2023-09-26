import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import startDB from "@/lib/db";
import UserPackage, { UserPackageData } from "@/db/schemas/UserPackage";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
};

export default handler;
