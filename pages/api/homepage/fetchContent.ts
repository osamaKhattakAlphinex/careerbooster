import { NextApiHandler } from "next";
import PdfParse from "pdf-parse";
import { Buffer } from "buffer";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const pdfData = req.body;
      const pdfBuffer = Buffer.from(pdfData);
      const pdfText = await PdfParse(pdfBuffer);
      console.log("first pdf text: ", pdfText.text);
      if (pdfText.text) {
        res.status(200).json({ content: pdfText.text });
      } else {
        res.status(500).json({ error: "Failed to extract text from the PDF." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process the PDF file." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
