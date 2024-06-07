import { NextResponse } from "next/server";
import OpenAI from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: any) {

  try {
    const { resume_content, potentialSkills } = await req.json();
    const inputPrompt = `
    
        Here are the top keywords: 
        ${potentialSkills}

        Here is the resume content:
        ${resume_content}

        On scale of 1-100 how much the resume content is scored against the top keywords.
        Also give potential problems that exist in the content
         
        Give answer in json like 
        {
            score: <YOUR NUMBER VALUE>
            problems: [Array of Strings]
        }
          `;

    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
      messages: [{ role: "user", content: inputPrompt }],
    });

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
