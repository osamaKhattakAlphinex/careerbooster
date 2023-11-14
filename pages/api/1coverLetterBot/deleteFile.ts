import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const { fileName } = req.body;
  const email = String(req.query.email);

  if (!fileName) {
    return res.status(400).json({ error: "File name is required" });
  }

  // Define the directory path where the file is located
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "files",
    "userResumes",
    email
  );
  const filePath = path.join(directoryPath, fileName);

  try {
    // Use fs.promises.unlink to delete the file
    await fs.promises.unlink(filePath);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the file" });
  }
};

export default handler;
