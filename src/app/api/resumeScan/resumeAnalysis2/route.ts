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
    const { resume_content } = await req.json();
    const inputPrompt = `Here is the resume data:
        ${resume_content}
        
        Find Keywords and potential problems from resume.

        Provide an overall resume score based on a detailed evaluation using the following stringent criteria:

        1. Content Quality (30 points)
            Relevance: Include only job-specific information.
            Clarity: Use clear and straightforward language.
            Conciseness: Avoid unnecessary details.
            Impact: Highlight achievements and quantify results.
        2. Keyword Optimization (15 points)
            Industry-specific keywords: Incorporate terms relevant to the job.
            Role-specific keywords: Use keywords from the job description.
        3. Grammar and Spelling (15 points)
            Correctness: Ensure there are no grammatical errors.
            Punctuation: Use proper punctuation consistently.
            Spelling: Avoid any spelling mistakes.
        4. Experience and Skills (20 points)
            Relevance: List experiences and skills pertinent to the job.
            Depth: Provide detailed descriptions where necessary.
            Appropriateness: Align experiences and skills with job requirements.
        5. Achievements and Impact (20 points)
            Quantifiable Results: Highlight measurable achievements.
            Significance: Show the impact of your contributions.
            Recognition: Mention any awards or recognitions received.
        
         
        Give answer in json like 
        {
            keywords: [Array of Strings],
            problems: [Array of Strings],
            score: <YOUR NUMBER VALUE>
        }
          `;

    const response = await openai.chat.completions.create({
      //   model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
      // model: model ? model : "gpt-4-1106-preview",
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: inputPrompt }],
    });

    // try {
    //   await startDB();

    //   const obj = {
    //     type: "resumeScan.resumeAnalysis",
    //     input: inputPrompt,
    //     output: response?.choices[0]?.message?.content?.replace(
    //       /(\r\n|\n|\r)/gm,
    //       ""
    //     ),
    //     idealOutput: "",
    //     status: "pending",
    //     Instructions: `Get Resume Score and Potential Problems in Resume against a specific job description`,
    //   };

    //   await TrainBot.create({ ...obj });
    // } catch (error) {}
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
