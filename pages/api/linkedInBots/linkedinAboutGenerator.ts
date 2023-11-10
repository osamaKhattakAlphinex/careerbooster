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
        stream: true,
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        temperature: 1,
      });

      // for await (const part of response) {
      //   console.log(part.choices[0].delta.content);
      //   // return res.status(200).json({
      //   //   success: true,
      //   //   data: part.choices[0].delta.content,
      //   //   linkedinContent,
      //   //   option,
      //   //   aboutInstructions,
      //   //   prompt,
      //   // });
      // }
      // const resp = await chain4.call({ query: input });

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
      // res.setHeader("Content-Type", "text/event-stream");
      // res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Connection", "keep-alive");

      for await (const part of response) {
        const data = part.choices[0].delta.content;

        if (data !== undefined) {
          res.write(data);
        }
      }

      res.end(); // Close the connection after the stream ends
    }
  }

  return res.status(400).json({
    success: false,
    msg: "something went wrong",
  });
};
export default handler;
