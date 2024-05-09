import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = body.content.substring(0, 12000);
    if (content) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "",
      });
      const input = `This is the job description: ${content}
              
              Rewrite and proofread it, also try to keep it in format so that it can look professional.
  
              Also give me top 10 skills that are related to this job
  
              The output must be in this format. (following is an example)
          {
            "jobDescription": "VALUE_HERE",
            "skills": []
          }
    
    
          The output must be a valid JSON
          `;

      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: input }],
      });
      try {
        const obj: any = {
          type: "deo.rewriteJob",
          input: input,
          output: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          idealOutput: "",
          status: "pending",
          userEmail: "DEO",
          Instructions: `Write about for consultant using his/her resume`,
        };
        await makeTrainedBotEntry(obj);
      } catch (error) {}

      return NextResponse.json(
        { success: true, result: response.choices[0].message.content },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
