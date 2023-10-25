import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const fileName = req.body.fileName;

    // For LinkedIn Toll  if file is uploaded then load content from that fiel
    if (fileName) {
      // load file
      const dir = path.join(
        process.cwd() + "/public",
        "/files",
        `/linkedin-temp`
      );
      const loader = new PDFLoader(`${dir}/${fileName}`);
      const docs = await loader.load();

      let contentTxt = docs.map((doc: any) => doc.pageContent);
      const content = contentTxt.join(" ");
      

      if (content) {
        // CREATING LLM MODAL
        const model = new OpenAI({
          modelName: "gpt-3.5-turbo",
          temperature: 0.5,
        });

        const input = `
            This is the User data:
            ${content}
  
            No Write a LinkedIn headline from the above user data for me using the headline formula below. 
            Job Title |Top Keyword 1 | Top Keyword 2 | Top Keyword 3 | Top Keyword 4 | Value proposition statement
            For example, a Marketing Director could use a headline like "Marketing Director | Social Media Expert | Email Marketing | PPC Expert |  Customer Engagement & Retention | Passionate About Mission Focused Brands & Companies.
        `;

        try {
          const resp = await model.call(input);
          // const resp = await chain4.call({ query: input });
          return res.status(200).json({ success: true, data: resp });
        } catch (error) {
          return res.status(400).json({ success: false, error });
        }
      }
    }
  }
};
export default handler;
