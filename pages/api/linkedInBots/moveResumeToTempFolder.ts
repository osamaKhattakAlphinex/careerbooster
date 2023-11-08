import { NextApiHandler } from "next";
// import fs from "fs";
import path from "path";
import fs from "fs/promises";

const handler: NextApiHandler = async (req, res) => {
  try {
    const fileName = req?.body?.fileName;

    if (fileName) {
      const oldPath = path.join(
        process.cwd(),
        `/public/files/linkedin-temp/${fileName}`
      );
      const newPath = path.join(
        process.cwd(),
        `/public/files/temp/${fileName}`
      );
      
      // move file to user folder
      await fs.rename(oldPath, newPath);
      return res.status(200).json({ success: true, msg: "File moved" });
    } else {
      return res.status(500).json({ error: "Bad Request" });
    }
  } catch (error) {
    return res.status(200).json({ error: "File wasn't moved" });
  }
};
export default handler;
