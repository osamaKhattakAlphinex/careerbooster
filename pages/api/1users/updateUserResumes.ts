import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const email = req?.body?.email;
    const resumes = req?.body?.resumes;

    if (resumes && email) {
      try {
        await startDB();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Update the resumes array with the new data
        user.resumes = resumes;

        // Save the updated user document
        await user.save();

        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ error: "Error updating resumes" });
      }
    } else {
      return res.status(400).json({ error: "Bad Request" });
    }
  } else {
    // Not Signed in
    return res.status(401).json({ message: "forbidden" });
  }
};

export default handler;
