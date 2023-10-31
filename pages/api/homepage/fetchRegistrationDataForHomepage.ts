import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";

// to Remove special characters from string
function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const fileName = req.body.fileName;

    // For Registration if file is uploaded then load content from that fiel
    if (fileName) {
      // load file
      const dir = path.join(process.cwd() + "/public", "/files", `/temp`);
      const loader = new PDFLoader(`${dir}/${fileName}`);
      const docs = await loader.load();

      let contentTxt = docs.map((doc: any) => doc.pageContent);

      const contentAll = contentTxt.join(" ");
      const content = removeSpecialChars(contentAll);

      if (content) {
        // CREATING LLM MODAL
        const model = new OpenAI({
          modelName: "gpt-3.5-turbo",
          temperature: 0.5,
        });

        const input = `
          This is the User Data:
          ${content}

          Now please give me the following information about the user:
          First Name:
          Last Name:
          Email Address:


          The answer MUST be a valid JSON and formatting should be like the following 
          replace the VALUE_HERE with the actual value
          {
            firstName: VALUE_HERE,
            lastName: VALUE_HERE,
            email: VALUE_HERE,
          }

          If there is no value Leave that field blank
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
