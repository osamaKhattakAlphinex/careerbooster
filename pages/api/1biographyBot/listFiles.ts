import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  // Define the directory path you want to list files from
  const directoryPath = path.join(process.cwd(), "public", "files", "bio");

  try {
    // Use fs.promises.readdir to read the contents of the directory
    const files = await fs.promises.readdir(directoryPath);

    // Send the list of files as a JSON response
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error reading directory:", error);
    res
      .status(500)
      .json({ error: "An error occurred while reading the directory" });
  }
};

export default handler;
