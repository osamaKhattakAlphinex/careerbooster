import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";
import TrainBot from "@/db/schemas/TrainBot";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const { option, aboutInstructions } = body;
      const linkedinContent = body.linkedinContent.substring(0, 8000);
      const trainBotData = body?.trainBotData;
      let prompt;
      await startDB();
      const promptRec = await Prompt?.findOne({
        type: "linkedinTool",
        name: option,
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";
      if (option === "aboutInstructions") {
        prompt = prompt.replaceAll("{{instructions}}", aboutInstructions);
      }

      if (linkedinContent) {
        const input = `This is the User data:
                ${linkedinContent}
    
                This is the prompt:
                ${prompt}`;

        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: [{ role: "user", content: input }],
        });

        try {
          if (trainBotData) {
            await startDB();

            // make a trainBot entry

            // const responseForTraining = await openai.chat.completions.create({
            //   model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg", // v2
            //   messages: [
            //     {
            //       role: "user",
            //       content: input,
            //     },
            //   ],
            //   temperature: 1,
            // });
            const obj = {
              type: "linkedinAiTool.about",
              input: input,
              output: response.choices[0].message.content,
              idealOutput: "",
              status: "pending",
              //  userEmail: trainBotData.userEmail,
              // fileAddress: trainBotData.fileAddress,
              Instructions: `Writing a detailed LinkedIn Summary awhich is engaging, impactful, have relevant industry jargon, highlight successes and services with call to action statement `,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) {}
        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
