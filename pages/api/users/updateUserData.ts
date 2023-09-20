import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

// UPDATES USER AND SET THE FILE
const handler: NextApiHandler = async (req, res) => {
  const data = req?.body?.data;

  if (data) {
    // update user
    await startDB();
    User.findOneAndUpdate(
      { email: data.email },
      { $set: { ...data } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((updatedUser) => {
        if (updatedUser) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(500).json({ error: `User not found` });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: `Error Updating Files` });
      });
  } else {
    return res.status(500).json({ error: "Bad Request" });
  }
};
export default handler;
