import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import UserPackage from "@/db/schemas/UserPackage";

const handler: NextApiHandler = async (req, res) => {
  const email = req?.query?.email;
  if (!email) {
    return res.status(400).json({ error: "Bad Request" });
  }

  await startDB();

  const user = await User.findOne({ email: email })
    .select("-password")
    .populate("userPackage");
  // .populate("userPackage");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ success: true, user });
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

export default handler;
