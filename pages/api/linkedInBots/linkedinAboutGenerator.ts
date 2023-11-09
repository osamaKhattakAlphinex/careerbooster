import { NextApiHandler } from "next";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";

// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 300,
};
// ...

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const { linkedinContent, option, aboutInstructions } = req.body;
    let prompt;
    await startDB();
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
    if (linkedinContent) {
      // CREATING LLM MODAL
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const input = `
            This is the User data:
            ${linkedinContent}

            This is the prompt: 
            ${prompt}
            `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // v2
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        temperature: 1,
        max_tokens: 2000,
      });
      // const resp = await chain4.call({ query: input });
      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content,
        linkedinContent,
        option,
        aboutInstructions,
        prompt,
      });

      // try {

      // } catch (error) {
      //   return res.status(400).json({
      //     success: false,
      //     error,
      //     linkedinContent,
      //     option,
      //     aboutInstructions,
      //     prompt,
      //   });
      // }
    }
  }
};
export default handler;
