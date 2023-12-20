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
export const maxDuration = 10; // This function can run for a maximum of 5 minutes
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
    const file = reqBody?.file;
    const coverletterId = reqBody?.coverletterId;
    const resumeId = reqBody?.resumeId;
    const jobDescription = reqBody?.jobDescription;
    const trainBotData = reqBody?.trainBotData;
    const id = reqBody?.id;
    let fileContent;

    // const dataset = "linkedin.genearteConsultingBid";
    const dataset = "coverLetter.write";
    const model = await getTrainedModel(dataset);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    // fetch prompt from db
    await startDB();

    const promptRec = await Prompt.findOne({
      type: "coverLetter",
      name: "coverLetterWriter",
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = promptDB.replace("{{jobDescription}}", jobDescription);

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
          JSON user/resume data: ${type === "file" ? fileContent : userData}

          this is the prompt:
          ${prompt}
          `;

    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        const payload: any = {
          id: coverletterId,
          jobDescription: jobDescription,
          coverLetterText: "",
          generatedOnDate: new Date().toISOString(),
          generatedViaOption: type,
          userEmail: email,
        };
        await postCoverLetter(payload);
        if (trainBotData) {
          let entry: TrainBotEntryType = {
            entryId: coverletterId,
            type: "coverLetter.write",
            input: inputPrompt,
            output: "out",
            idealOutput: "",
            status: "pending",
            userEmail: email,
            fileAddress: "",
            Instructions: `Generate Cover Letter ${trainBotData.userEmail}`,
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
