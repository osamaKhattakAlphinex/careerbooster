import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { type, email } = JSON.parse(req.body);

    if (!email) {
      return res.status(400).json({ error: "Bad Request" });
    }

    try {
      await startDB();

      // Find the user by email
      const user = await User.findOne({ email }).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the resumes_generation field in userPackageUsed
      if (user.userPackageUsed) {
        if (type === "resumes_generation") {
          user.userPackageUsed.resumes_generation += 1;
        }
        if (type === "keywords_generation") {
          user.userPackageUsed.keywords_generation += 1;
        }
        if (type === "headline_generation") {
          user.userPackageUsed.headline_generation += 1;
        }
        if (type === "about_generation") {
          user.userPackageUsed.about_generation += 1;
        }
        if (type === "job_desc_generation") {
          user.userPackageUsed.job_desc_generation += 1;
        }
        if (type === "cover_letter_generation") {
          user.userPackageUsed.cover_letter_generation += 1;
        }
        if (type === "email_generation") {
          user.userPackageUsed.email_generation += 1;
        }
        if (type === "pdf_files_upload") {
          user.userPackageUsed.pdf_files_upload += 1;
        }
        if (type === "review_resume") {
          user.userPackageUsed.review_resume += 1;
        }
        if (type === "consulting_bids_generation") {
          user.userPackageUsed.consulting_bids_generation += 1;
        }
      }

      // Save the updated user document
      await user.save();

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error updating resumes generation" });
    }
  } else {
    // Not Signed in
    return res.status(401).json({ message: "forbidden" });
  }
};

export default handler;
