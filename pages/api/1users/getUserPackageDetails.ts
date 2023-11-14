import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import UserPackage from "@/db/schemas/UserPackage";

const handler: NextApiHandler = async (req, res) => {
  const id = req?.query?.id;
  if (!id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  await startDB();

  const userPackage = await UserPackage.findById(id);
  if (!userPackage) {
    return res.status(404).json({ error: "User package not found" });
  }

  return res.status(200).json({ success: true, userPackage });
};

export default handler;
