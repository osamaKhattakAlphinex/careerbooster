import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { OpenAIStream, StreamingTextResponse } from "ai";
import startDB from "@/lib/db";
import OpenAI from "openai";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";

import { postKeywords } from "./linkedInKeywords/route";
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
    const keywordsId = reqBody?.keywordsId;
    const email = reqBody?.email;
    await startDB();
    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "keyword",
      active: true,
    });
    const prompt = promptRec.value;

    const inputPrompt = `Read {{PersonName}}'s resume : ${JSON.stringify(userData)}

          and then:
          ${prompt}
          `;

    const dataset = "linkedin.keywords";
    const model = await getTrainedModel(dataset);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        const payload = {
          id: keywordsId,
          keywordsText: "",
          generatedOnDate: new Date().toISOString(),
          userEmail: email,
        };

        await postKeywords(payload);

        if (trainBotData) {
          let entry: TrainBotEntryType = {
            entryId: keywordsId,
            type: "linkedin.keywords",
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
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
