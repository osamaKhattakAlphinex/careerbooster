import Prompt from "@/db/schemas/Prompt";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { encodingForModel } from "js-tiktoken";
import { updateUserTokens } from "@/helpers/updateUserTokens";
import { TrainBotEntryType, makeTrainedBotEntry } from "@/helpers/makeTrainBotEntry";

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
    const experience = reqBody?.experience;
    const trainBotData = reqBody?.trainBotData;
    const jobDescriptionId = reqBody?.jobDescriptionId;
    const personName = reqBody?.personName;
    const dataset = "linkedin.jobDescription";
    const model = await getTrainedModel(dataset);
    const creditsUsed = reqBody?.creditsUsed;
    const email = reqBody?.email;
    const userCredits = await getUserCreditsByEmail(email);

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }
    await startDB();
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "jobDescription",
      active: true,
    });
    let prompt = promptRec.value;
    prompt = await prompt.replaceAll("{{PersonName}}", personName);
    prompt = await prompt.replaceAll("{{JobTitle}}", experience.jobTitle);

    const inputPrompt = ` ${prompt}
    
    Here is the work experience: 
      Job Title: ${experience.jobTitle}
      Company Name: ${experience.company}
      From Month: ${experience.fromMonth}
      From Year: ${experience.fromYear}
      To Month: ${experience.toMonth}
      To Year: ${experience.toYear}
      is the job continued: ${experience.isContinue}
      Job Description: ${experience.description}
      Company country: ${experience.country}
      Company city,State: ${experience.cityState}
     
      `;
    const response: any = await openai.chat.completions.create({
      model: model ? model : "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    const enc = encodingForModel("gpt-3.5-turbo"); // js-tiktoken
    let completionTokens = 0;
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
        if (trainBotData) {
          let entry: TrainBotEntryType = {
              entryId: jobDescriptionId,
              type: "linkedin.jobDescription",
              input: inputPrompt,
              output: completions,
              idealOutput: "",
              status: "pending",
              userEmail: email,
              fileAddress: "",
              Instructions: `Write Job Descriptions for ${personName} at different companies`,
          };
          await makeTrainedBotEntry(entry);
      }
        if (completionTokens > 0) {
          await updateUserTokens(email, completionTokens);
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
