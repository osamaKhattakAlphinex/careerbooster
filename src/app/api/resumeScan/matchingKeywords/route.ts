import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
  try {
    const { potentialSkills, aiResumeKeywords } = await req.json();
    const inputPrompt = `
    
        Here is the first required keywords for a specific job: 
        ${potentialSkills}

        And here is the second individual person's keywords
        ${aiResumeKeywords}

        Give me a list of matching keywords from first keywords list and required keywords that are missing in second.


        The answer must be in a valid JSON like 
        {
          matchingKeywords: [Array of Strings]
          missingKeywords: [Array of Strings]
        }
          `;
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
      messages: [{ role: "user", content: inputPrompt }],
    });
    try {
      await startDB();

      const obj = {
        type: "resumeScan.job.getMatchingKeywords",
        input: inputPrompt,
        output: response?.choices[0]?.message?.content?.replace(
          /(\r\n|\n|\r)/gm,
          ""
        ),
        idealOutput: "",
        status: "pending",
        Instructions: `Get MAtching Keywords from resume and job description`,
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
