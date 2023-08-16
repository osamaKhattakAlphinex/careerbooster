import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

const handler: NextApiHandler = async (req, res) => {
  const email = req?.query?.email;
  if (email) {
    await startDB();
    User.findOne({ email: email })
      .select("-password")
      .then((user) => {
        if (user) {
          return res.status(200).json({ success: true, user });
        } else {
          return res.status(500).json({ error: `User not found` });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: `Error getting User` });
      });
  } else {
    return res.status(500).json({ error: "Bad Request" });
  }
};
export default handler;
