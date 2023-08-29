const screenshot = require("screenshot-desktop");
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  screenshot({ filename: "shot.jpg" }).then((imgPath: any) => {
    // imgPath: absolute path to screenshot
    // created in current working directory named shot.png
    return res.status(200).json({ success: true, data: imgPath });
  });
};

export default handler;
