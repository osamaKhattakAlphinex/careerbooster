import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const fileName = req.body.fileName;

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
            Write a maximum of 2000 characters copy for the “About Section” of my LinkedIn based the above data. Use the following instructions.

          - It should be detailed but compact, and engaging

          - Use relevant industry jargon as necessary. Make sure to provide a brief rundown of the main technical skills related to my job title. 

          - Hook the audience right away and make the first sentence count by showing passion.

          - Provide a professional introduction explaining the present role and framing past job titles.

          - Highlight successes and the services I can offer to potential clients.

          - Include a call to action.

          Just give me the answer not add any extra labels


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
