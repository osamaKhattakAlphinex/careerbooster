import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

const handler: NextApiHandler = async (req, res) => {
  const { email, resumeData } = req.body;

  if (!email || !resumeData) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    await startDB();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user's resume array is empty
    if (!user.resumes || user.resumes.length === 0) {
      // If It{"'"}s empty, create a new array with the new resume object
      user.resumes = [resumeData];
    } else {
      // If not empty, check if the new Resume{"'"}s id matches an existing record
      const existingResumeIndex = user.resumes.findIndex(
        (resume: any) => resume.id === resumeData.id
      );

      if (existingResumeIndex !== -1) {
        // If matching record found, update it
        user.resumes[existingResumeIndex] = resumeData;
      } else {
        // If no matching record found, add the new resume object to the array
        user.resumes.unshift(resumeData);
      }
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Error updating resume" });
  }
};

export default handler;
