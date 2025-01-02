import Prompt from "@/db/schemas/Prompt";

import TrainBot from "@/db/schemas/TrainBot";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { postEmail, putEmail } from "../route";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { encodingForModel } from "js-tiktoken";
import { updateUserTokens } from "@/helpers/updateUserTokens";
// The answer must be formatted and returned as HTML
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

  const getPromptName = (generationType: string) => {
    if (generationType === "email") {
      return "emailWriter";
    }
    if (generationType === "firstFollowUp") {
      return "emailWriterFirstFollowUp";
    }
    if (generationType === "secondFollowUp") {
      return "emailWriterSecondFollowUp";
    }
  };

  const replacePromptData = (
    generationType: string,
    promptDB: any,
    args: any
  ) => {
    const { jobDescription, emailText, firstFollowUpText } = args;
    if (generationType === "email") {
      return promptDB.replaceAll("{{jobDescription}}", jobDescription);
    } else if (generationType === "firstFollowUp") {
      return promptDB.replaceAll("{{emailText}}", emailText);
    } else if (generationType === "secondFollowUp") {
      promptDB = promptDB.replaceAll("{{emailText}}", emailText);
      promptDB = promptDB.replaceAll(
        "{{firstFollowUpEmailText}}",
        firstFollowUpText
      );
      return promptDB;
    }
  };

  try {
    const reqBody = await req.json();
    const type = reqBody?.type;
    const userData = reqBody?.userData;
    const email = reqBody?.email;
    const creditsUsed = reqBody?.creditsUsed;
    const userCredits = await getUserCreditsByEmail(email);
    const file = reqBody?.file;
    const jobDescription = reqBody?.jobDescription;
    const trainBotData = reqBody?.trainBotData;
    const savedId = reqBody?.emailId;
    const generationType = reqBody?.generationType;
    const emailText = reqBody?.emailText;
    const firstFollowUpText = reqBody?.firstFollowUpText;

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }
    let dataset: string = "";

    if (generationType === "email") {
      dataset = "email.followupSequence";
    }
    if (generationType === "firstFollowUp") {
      dataset = "email.firstFollowUpSequence";
    }
    if (generationType === "secondFollowUp") {
      dataset = "email.secondFollowUpSequence";
    }
    const model = await getTrainedModel(dataset);

    await startDB();
    const promptRec = await Prompt.findOne({
      type: "email",
      name: getPromptName(generationType),
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = await replacePromptData(generationType, promptDB, {
      jobDescription,
      emailText,
      firstFollowUpText,
    });

    let fileContent;
    // CREATING LLM MODAL

    if (type === "file") {
      const user = await User.findOne({ email: email }, { files: 1 });
      if (user) {
        const getFile = user.files.find(
          (userFile: any) => userFile.fileName === file
        );
        fileContent = getFile.fileContent;
      }
      //   res.end();
    }
    // this will run for both TYPES aiResume and profile
    const inputPrompt = `${
      generationType === "email"
        ? `Following are the content of the resume (in JSON format): 
    JSON user/resume data: ${
      type === "file" ? fileContent : JSON.stringify(userData)
    }`
        : ""
    } 
  
            ${prompt}
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
        await updateToolUsage("Email Generation Tool", creditsUsed);
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
          if (trainBotData && generationType === "email") {
            const emailId = makeid();
            const payload = {
              id: emailId,
              jobDescription: jobDescription,
              emailText: completions,
              generatedOnDate: new Date().toISOString(),
              generatedViaOption: type,
              userEmail: email,
            };

            await postEmail(payload);
            let entry: TrainBotEntryType = {
              entryId: emailId,
              type: "email.followupSequence",
              input: inputPrompt,
              output: completions,
              idealOutput: "",
              status: "pending",
              userEmail: email,
              fileAddress: "",
              Instructions: `Generate Email for ${trainBotData.userEmail}`,
            };
            await makeTrainedBotEntry(entry);
          } else if (
            generationType === "firstFollowUp" ||
            generationType === "secondFollowUp"
          ) {
            const payload = {
              id: savedId,
              generationType: generationType,
              emailText: completions,
              userEmail: email,
            };
            await putEmail(payload);
            let entry: TrainBotEntryType = {
              entryId: savedId,
              type: `email.${generationType}Sequence`,
              input: inputPrompt,
              output: completions,
              idealOutput: "",
              status: "pending",
              userEmail: email,
              fileAddress: "",
              Instructions: `Generate Email for ${trainBotData.userEmail}`,
            };
            await makeTrainedBotEntry(entry);
          }
        } catch {
          console.log("error while saving Emails....");
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
