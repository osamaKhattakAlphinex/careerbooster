import { NextApiHandler } from "next";
// import { OpenAI } from "langchain/llms/openai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const content = req.body.linkedinContent;
    let prompt;
    await startDB();
    const promptRec = await Prompt.findOne({
      type: "linkedinTool",
      name: "headline",
      active: true,
    });
    prompt = promptRec ? promptRec.value : "";
    // For LinkedIn Toll  if file is uploaded then load content from that fiel
    if (content) {
      // load file
      // const dir = path.join(
      //   process.cwd() + "/public",
      //   "/files",
      //   `/linkedin-temp`
      // );
      // const loader = new PDFLoader(`${dir}/${fileName}`);
      // const docs = await loader.load();

      // let contentTxt = docs.map((doc: any) => doc.pageContent);
      // const content = contentTxt.join(" ");

      // CREATING LLM MODAL
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const input = `
            This is the User data:
            ${content}
            This is the prompt:
            ${prompt}`;

      try {
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-0613:careerbooster-ai::8Dvh6dPq", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
          max_tokens: 456,
        });

        // const resp = await chain4.call({ query: input });
        return res
          .status(200)
          .json({ success: true, data: response.choices[0].message.content });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
};
export default handler;
