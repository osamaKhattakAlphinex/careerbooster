import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import startDB from "@/lib/db";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { postHeadlines } from "./linkedInHeadline/route";
export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const userData = reqBody?.userData;
    const trainBotData = reqBody?.trainBotData;
    const headlineId = reqBody?.headlineId;
    const email = reqBody?.email;

    await startDB();
    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "headline",
      active: true,
    });
    const prompt = promptRec.value;

    const dataset = "linkedin.headlines";
    const model = await getTrainedModel(dataset);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    const inputPrompt = `This is the User data: ${JSON.stringify(userData)}

          this is the prompt:
          ${prompt}
          `;

    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        const payload = {
          id: headlineId,
          headlineText: "",
          generatedOnDate: new Date().toISOString(),
          userEmail: email,
        };
        await postHeadlines(payload);
        if (trainBotData) {
          let entry: TrainBotEntryType = {
            entryId: headlineId,
            type: "linkedin.headlines",
            input: inputPrompt,
            output: "out",
            idealOutput: "",
            status: "pending",
            userEmail: email,
            fileAddress: "",
            Instructions: `Generate Linkedin Headline for ${trainBotData.userEmail}`,
          };
          await makeTrainedBotEntry(entry);
        }
      },
    });

    // Respond with the stream
    return new StreamingTextResponse(stream);
    // res.end();
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
