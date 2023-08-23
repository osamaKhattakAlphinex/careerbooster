import { NextApiHandler } from "next";
// import fs from "fs";
import path from "path";
import fs from "fs/promises";

const handler: NextApiHandler = async (req, res) => {
  try {
    const email = req?.body?.email;
    const fileName = req?.body?.fileName;

    if (email && fileName) {
      const oldPath = path.join(
        process.cwd(),
        `/public/files/temp/${fileName}`
      );
      const newPath = path.join(
        process.cwd(),
        `/public/files/${email}/${fileName}`
      );

      // check the user folder exists if not create one
      let directory = `/public/files/${email}`;

      try {
        await fs.readdir(path.join(process.cwd() + directory));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + directory));
      }

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
