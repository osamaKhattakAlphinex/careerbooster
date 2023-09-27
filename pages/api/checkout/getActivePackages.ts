import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import UserPackage from "@/db/schemas/UserPackage";

const handler: NextApiHandler = async (req, res) => {
  const status = req?.body?.status ?? "active";
  if (!status) {
    return res.status(400).json({ error: "Bad Request" });
  }

  await startDB();

  const packages = await UserPackage.find({ status });

  if (!packages) {
    return res.status(404).json({ error: "Packages not found" });
  }

  return res.status(200).json({ success: true, packages });
};

export default handler;
