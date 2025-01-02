import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextRequest, NextResponse } from "next/server";
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
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { updateUserTokens } from "@/helpers/updateUserTokens";
import { encodingForModel } from "js-tiktoken";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
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
    const personName = reqBody?.personName;
    const creditsUsed = reqBody?.creditsUsed;
    const trainBotData = reqBody?.trainBotData;
    const headlineId = reqBody?.headlineId;
    const email = reqBody?.email;
    const userCredits = await getUserCreditsByEmail(email);
    console.log(userCredits, creditsUsed);

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }

    await startDB();
    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "headline",
      active: true,
    });
    let prompt = promptRec.value;
    prompt = await prompt.replaceAll("{{PersonName}}", personName);

    const dataset = "linkedin.headlines";
    const model = await getTrainedModel(dataset);

    const inputPrompt = `Read ${personName}'s resume : ${JSON.stringify(
      userData
    )}
  
            and then:
            ${prompt}
            `;

    const response = await openai.chat.completions.create({
      model: model ? model : "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
    let completionTokens = 0;
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        await updateUserTotalCredits(email, creditsUsed);
        await updateToolUsage("Linkedin Tool", creditsUsed);
      },
      onToken: async (content) => {
        const tokenList = enc.encode(content);
        completionTokens += tokenList.length;
      },
      onFinal: async (completions) => {
        try {
          if (completionTokens > 0) {
            await updateUserTokens(email, completionTokens);
          }
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
        } catch (err) {}
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
