import Prompt from "@/db/schemas/Prompt";

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/db/schemas/User";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { postCoverLetter } from "../route";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
import { updateToolUsage } from "@/helpers/updateToolUsage";
import { encodingForModel } from "js-tiktoken";
import { updateUserTokens } from "@/helpers/updateUserTokens";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
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
    const type = reqBody?.type;
    const userData = reqBody?.userData;
    const email = reqBody?.email;
    const name = reqBody?.name;
    const phone = reqBody?.phone;
    const address = reqBody?.address;
    const date = reqBody?.date;
    const file = reqBody?.file;
    const jobDescription = reqBody?.jobDescription;
    const creditsUsed = reqBody?.creditsUsed;
    const userCredits = await getUserCreditsByEmail(email);
    const trainBotData = reqBody?.trainBotData;
    let fileContent;
    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        );
      }
    }
    const dataset = "coverLetter.write";
    const model = await getTrainedModel(dataset);

    // fetch prompt from db
    await startDB();

    const promptRec = await Prompt.findOne({
      type: "coverLetter",
      name: "coverLetterWriter",
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = await promptDB.replaceAll(
      "{{jobDescription}}",
      jobDescription
    );

    if (type === "file") {
      const user = await User.findOne({ email: email }, { files: 1 });
      if (user) {
        const getFile = user.files.find(
          (userFile: any) => userFile.fileName === file
        );
        fileContent = getFile.fileContent.substring(0, 10000);
      }
    }
    const inputPrompt = `Following are the content of the resume (in JSON format): 
            JSON user/resume data: ${
              type === "file" ? fileContent : JSON.stringify(userData)
            }
  
            this is the prompt:
            ${prompt}
            Name: ${userData.firstName} ${userData.lastName}
            Email : ${userData.email}
            Phone : ${userData.phone}
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
        await updateToolUsage("Cover Letter Generator", creditsUsed);
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
          completions = completions.replace("```html", "");
          completions = completions.replace("```", "");
          if (trainBotData) {
            const coverletterId = makeid();

            const payload = {
              id: coverletterId,
              jobDescription: jobDescription,
              name: name,
              phone: phone,
              email: email,
              address: address,
              date: date,
              coverLetterText: completions,
              generatedOnDate: new Date().toISOString(),
              generatedViaOption: type,
              userEmail: email,
            };

            await postCoverLetter(payload);

            let entry: TrainBotEntryType = {
              entryId: coverletterId,
              type: "coverLetter.write",
              input: inputPrompt,
              output: completions,
              idealOutput: "",
              status: "pending",
              userEmail: email,
              fileAddress: "",
              Instructions: `Generate Cover Letter ${trainBotData.userEmail}`,
            };
            await makeTrainedBotEntry(entry);
          }
        } catch {
          console.log("error while saving coverletter....");
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
