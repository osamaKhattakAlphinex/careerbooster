import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { postJobDescriptions } from "./linkedInJobDescription/route";
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
    const experience = reqBody?.experience;
    const trainBotData = reqBody?.trainBotData;
    const jobDescriptionId = reqBody?.jobDescriptionId;
    const email = reqBody?.email;
    const dataset = "resume.writeJDSingle";
    const model = await getTrainedModel(dataset);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "jobDescription",
      active: true,
    });
    const prompt = promptRec.value;
    const inputPrompt = `You are a helpful assistant that helps Writing Individual Job Description for a person for his Resume.
      The Resume Data is as follows:
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
      
      This is the prompt:
      ${prompt}
      `;
    const response: any = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    // make a trainBot entry
    // try {
    //   if (trainBotData) {
    //     await startDB();

    //     const obj = {
    //       type: "linkedin.jobDescription",
    //       input: prompt,
    //       output: response?.choices[0]?.message?.content?.replace(
    //         /(\r\n|\n|\r)/gm,
    //         ""
    //       ),
    //       idealOutput: "",
    //       status: "pending",
    //       userEmail: trainBotData.userEmail,
    //       fileAddress: trainBotData.fileAddress,
    //       Instructions: `Write Single Job Description for ${experience.jobTitle} at ${experience.company}`,
    //     };

    //     await TrainBot.create({ ...obj });
    //   }
    // } catch (error) {}

    const stream = OpenAIStream(response, {
      onStart: async () => {
        const payload = {
          id: jobDescriptionId,
          jobDescriptionText: "",
          generatedOnDate: new Date().toISOString(),
          userEmail: email,
        };

        await postJobDescriptions(payload);
        if (trainBotData) {
          let entry: TrainBotEntryType = {
            entryId: jobDescriptionId,
            type: "linkedin.jobDescription",
            input: inputPrompt,
            output: "out",
            idealOutput: "",
            status: "pending",
            userEmail: email,
            fileAddress: "",
            Instructions: `Write Single Job Description for ${experience.jobTitle} at ${experience.company}`,
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
