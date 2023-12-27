import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getTrainedModel } from "@/helpers/getTrainedModel";
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
    const quantifyingExperience = reqBody?.quantifyingExperience;
    const personName =  reqBody?.personName
    const jobTitle =  reqBody?.jobTitle
    const dataset = "resume.writeJDSingle";
    const model = await getTrainedModel(dataset);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);
    let promptRec;
    let prompt
    await startDB();
    if (quantifyingExperience) {
      promptRec = await Prompt.findOne({
        type: "resume",
        name: "QuantifyingjdSingle",
        active: true,
      });

      prompt = promptRec.value;
      prompt = prompt.replaceAll("{{PersonName}}", personName)
      prompt = prompt.replaceAll("{{JobTitle}}", jobTitle)
    } else {
      promptRec = await Prompt.findOne({
        type: "resume",
        name: "jdSingle",
        active: true,
      });



      prompt = promptRec.value;
      prompt = prompt.replaceAll("{{PersonName}}", personName)
      prompt = prompt.replaceAll("{{JobTitle}}", jobTitle)

    }

    const inputPrompt = `
    ${prompt}

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



      ///person name and job replace from prompt
    const response: any = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });

    // make a trainBot entry
    try {
      if (trainBotData) {
        await startDB();

        const obj = {
          type: "resume.writeJDSingle",
          input: prompt,
          output: response,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Write Single Job Description for ${experience.jobTitle} at ${experience.company}`,
        };

        await TrainBot.create({ ...obj });
      }
    } catch (error) {}

    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
