import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import Prompt from "@/db/schemas/Prompt";
const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const { fileName, option, aboutInstructions } = req.body;
    let prompt;

    const promptRec = await Prompt.findOne({
      type: "linkedinTool",
      name: option,
      active: true,
    });
    prompt = promptRec ? promptRec.value : "";
    if (option === "aboutInstructions") {
      prompt = prompt.replaceAll("{{instructions}}", aboutInstructions);
    }

    // For LinkedIn Tool if file is uploaded then load content from that fiel
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

            This is the prompt:
            ${prompt}
            
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
