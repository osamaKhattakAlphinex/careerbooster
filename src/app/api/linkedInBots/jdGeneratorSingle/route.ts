import Prompt from "@/db/schemas/Prompt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
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
    const personName = reqBody?.personName;
    const dataset = "linkedin.jobDescription";
    const model = await getTrainedModel(dataset);
    const creditsUsed = reqBody?.creditsUsed;
    const email = reqBody?.email;
    const userCredits = await getUserCreditsByEmail(email);
    //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        )
      }
    }
    await startDB()
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "jobDescription",
      active: true,
    });
    let prompt = promptRec.value;
    prompt = prompt.replaceAll("{{PersonName}}", personName);
    prompt = prompt.replaceAll("{{JobTitle}}", experience.jobTitle)

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



    const stream = OpenAIStream(response, {
      onStart: async () => {
        await updateUserTotalCredits(email, creditsUsed)
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
