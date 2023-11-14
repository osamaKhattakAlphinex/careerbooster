import OpenAI from "openai";
// import Prompt from "@/db/schemas/Prompt";
// import startDB from "@/lib/db";
import type { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};
// This function can run for a maximum of 5 seconds
// ...
// export const config = {
//   runtime: "edge",
// };
// export const runtime = "edge";
export default async function handler(request: NextRequest, res: any) {
  const body = await request.json();
  if (body) {
    const { linkedinContent, option, aboutInstructions } = body;
    // let prompt;
    // await startDB();
    // const promptRec = await Prompt?.findOne({
    //   type: "linkedinTool",
    //   name: option,
    //   active: true,
    // });
    // prompt = promptRec ? promptRec.value : "";
    // if (option === "aboutInstructions") {
    //   prompt = prompt.replaceAll("{{instructions}}", aboutInstructions);
    // }
    // For LinkedIn Tool if file is uploaded then load content from that fiel

    let prompt = `Write a maximum of 2000 characters copy for the “About Section” of my LinkedIn based on the data you have. Use the following instructions.

      - It should be detailed but compact, and engaging

      - Use relevant industry jargon as necessary. Make sure to provide a brief rundown of the main technical skills related to my job title. 

      - Hook the audience right away and make the first sentence count by showing passion.

      - Provide a professional introduction explaining the present role and framing past job titles.

      - Highlight successes and the services I can offer to potential clients.

      - Include a call to action.


      Just give me the answer not add any extra labels

      pleas write this text the {"About Default Prompt"} in  last`;

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

      // res.setHeader("Content-Type", "text/event-stream");
      // res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Connection", "keep-alive");
      // const encoder = new TextEncoder();
      // This is the stream object, which clients can read from
      // when you send it as a Function response
      // const readableStream = new ReadableStream({
      //   // The start method is where you'll add the stream's content
      //   async start(controller) {
      //     // Queue the encoded content into the stream
      //     for await (const part of response) {
      //       const text = part.choices[0]?.delta?.content ?? "";
      //       // res.write(data);
      //       controller.enqueue(encoder.encode(text));
      //     }
      //     // Prevent more content from being
      //     // added to the stream
      //     controller.close();
      //   },
      // });
      let test = "";
      for await (const part of response) {
        const data = part.choices[0].delta.content;

        if (data !== undefined) {
          // res.write(data);
          test += data;
        }
      }
      // return new Response(readableStream);
      // res.end(); // Close the connection after the stream ends
      return new Response(
        JSON.stringify({
          status: 200,
          success: true,
          data: test,
        })
      );
    }
  }

  // return res.status(400).json({
  //   success: false,
  //   msg: "something went wrong",
  // });
}
