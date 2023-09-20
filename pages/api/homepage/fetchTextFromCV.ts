import { NextApiHandler } from "next";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const file = reqBody.file;
    const email = reqBody.email;

    if (file) {
      // load file
      let dir;
      if (email) {
        dir = path.join(
          process.cwd() + "/public",
          "/files",
          `/userResumes`,
          `/${email}`
        );
      } else {
        // DEPRECATED for old register wizard
        dir = path.join(process.cwd() + "/public", "/files", `/temp`);
      }

      const loader = new PDFLoader(`${dir}/${file}`);
      const docs = await loader.load();

      let content = docs.map((doc: any) => doc.pageContent);
      let rawCVContent = content.join(" ");
      return res.status(200).json({ success: true, text: rawCVContent });
    }
  }
};
export default handler;
