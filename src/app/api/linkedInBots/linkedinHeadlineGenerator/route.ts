import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getTrainedModel } from "@/helpers/getTrainedModel";

// This function can run for a maximum of 5 seconds
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.linkedinContent.substring(0, 8000);
      const trainBotData = body?.trainBotData;
      let prompt:string = "";
      await startDB();
      const promptRec = await Prompt.findOne({
        type: "linkedin",
        name: "headline",
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";

      // For LinkedIn Toll  if file is uploaded then load content from that fiel
      if (content) {
        const dataset = "linkedin.headlines";
        const model = await getTrainedModel(dataset);

        const input = `
        Read Person's resume :
            ${content}
            and then:
            ${prompt}
            `;

        const response: any = await openai.chat.completions.create({
          model: model ? model : "gpt-3.5-turbo", // v2
          stream: true,
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        });

        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
