import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: any) {
  try {
    const { jobDescription } = await req.json();
    const inputPrompt = `
    
        Here is the job experience: 
        ${jobDescription}

        What are the potential skills / keywords  that one should have.

        The answer must be in a valid JSON array
         
          `;

    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
      messages: [{ role: "user", content: inputPrompt }],
    });
    try {
      await startDB();

      const obj = {
        type: "resumeScan.job.getPotentialKeywords",
        input: inputPrompt,
        output: response?.choices[0]?.message?.content?.replace(
          /(\r\n|\n|\r)/gm,
          ""
        ),
        idealOutput: "",
        status: "pending",
        Instructions: `Get Potential Keywords from given resume`,
      };

      await TrainBot.create({ ...obj });
    } catch (error) {}

    return NextResponse.json(
      {
        result: response?.choices[0]?.message?.content?.replace(
          /(\r\n|\n|\r)/gm,
          ""
        ),
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
