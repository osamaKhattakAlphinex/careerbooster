import { NextApiHandler } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  try {
    const file = req.query.file;
    const dir = path.join(process.cwd() + "/public", "/files");
    const loader = new PDFLoader(`${dir}/${file}`);
    const docs = await loader.load();

    res.status(200).json({ success: true, content: docs });
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};
export default handler;
