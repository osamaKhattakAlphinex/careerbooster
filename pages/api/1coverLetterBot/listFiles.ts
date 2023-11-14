import { NextApiHandler } from "next";
// import fs from "fs";
import fs from "fs/promises";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  const email = String(req.query.email);
  if (email) {
    // Define the directory path you want to list files from
    const directoryPath = path.join(
      process.cwd(),
      "public",
      "files",
      "userResumes",
      email
    );

    try {
      await fs.readdir(directoryPath);
    } catch (error) {
      await fs.mkdir(directoryPath);
    }

    try {
      // Use fs.promises.readdir to read the contents of the directory
      const files = await fs.readdir(directoryPath);

      // Send the list of files as a JSON response
      res.status(200).json({ files });
    } catch (error) {
      console.error("Error reading directory:", error);
      res
        .status(500)
        .json({ error: "An error occurred while reading the directory" });
    }
  } else {
    return res.status(500).json({ success: false, msg: "Invalid Request" });
  }
};

export default handler;
