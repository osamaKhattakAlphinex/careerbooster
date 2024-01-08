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
    const personName = reqBody?.personName

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
    let prompt = promptRec.value;
    prompt = prompt.replaceAll("{{PersonName}}", personName);

    const dataset = "linkedin.headlines";
    const model = await getTrainedModel(dataset);

    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    const inputPrompt = `Read ${personName}'s resume : ${JSON.stringify(userData)}

          and then:
          ${prompt}
          `;

    const response: any = await openai.chat.completions.create({
      model: model ? model : "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onFinal: async (completions) => {
        try {
          if (trainBotData) {
            const headlineId = makeid();

            const payload = {
              id: headlineId,
              headlineText: completions,
              generatedOnDate: new Date().toISOString(),
              userEmail: trainBotData.userEmail,
            };

            await postHeadlines(payload);

            let entry: TrainBotEntryType = {
              entryId: headlineId,
              type: "linkedin.headlines",
              input: inputPrompt,
              output: completions,
              idealOutput: "",
              status: "pending",
              userEmail: email,
              fileAddress: "",
              Instructions: `Generate Linkedin Headline for ${trainBotData.userEmail}`,
            };
            await makeTrainedBotEntry(entry);
          }
        } catch (err) { }
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
