import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { getTrainedModel } from "@/helpers/getTrainedModel";
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
    const dataset = "resumeScan.resumeAnalysis";
    const model = await getTrainedModel(dataset);
    await startDB();
    const promptRec = await Prompt.findOne({
      type: "resumeScan",
      name: "resumeAnalysis",
      active: true,
    });
    let inputPrompt = promptRec.value;
    inputPrompt = inputPrompt.replaceAll("{{resumeData}}", resume_content);

    const response = await openai.chat.completions.create({
      //   model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
      model: model ? model : "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: inputPrompt }],
    });

    try {
      await startDB();

      const obj = {
        type: "resumeScan.resumeAnalysis",
        input: inputPrompt,
        output: response?.choices[0]?.message?.content?.replace(
          /(\r\n|\n|\r)/gm,
          ""
        ),
        idealOutput: "",
        status: "pending",
        Instructions: "Get Resume Score, Keywords and Potential Problems in Resume",
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
