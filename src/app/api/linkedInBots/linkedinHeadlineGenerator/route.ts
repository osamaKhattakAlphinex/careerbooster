// import { OpenAI } from "langchain/llms/openai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import TrainBot from "@/db/schemas/TrainBot";
import TrainedModel from "@/db/schemas/TrainedModel";
import { getTrainedModel } from "@/helpers/getTrainedModel";

// This function can run for a maximum of 5 seconds
export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.linkedinContent.substring(0, 8000);
      const trainBotData = body?.trainBotData;
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
        const dataset = "linkedinAiTool.headline";
        const model = await getTrainedModel(dataset);
        //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

        // CREATING LLM MODAL

        const input = `
            This is the User data:
            ${content}
            This is the prompt:
            ${prompt}
            `;

        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // v2
          stream: true,
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        });

        // const resp = await chain4.call({ query: input });
        // return NextResponse.json(
        //   { result: response.choices[0].message.content, success: true },
        //   { status: 200 }
        // );
        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response, {
          async onFinal(completions) {
            try {
              if (trainBotData) {
                await startDB();

                // make a trainBot entry
                const obj = {
                  type: "linkedinAiTool.headline",
                  input: input,
                  output: response,
                  idealOutput: "",
                  status: "pending",
                  //  userEmail: trainBotData.userEmail,
                  // fileAddress: trainBotData.fileAddress,
                  Instructions: `Writing a LinkedIn headline as Job Title |Top Keyword 1 | Top Keyword 2 | Top Keyword 3 | Top Keyword 4 | Value proposition statement`,
                };

                await TrainBot.create({ ...obj });
              }
            } catch (error) {}
          },
        });
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
