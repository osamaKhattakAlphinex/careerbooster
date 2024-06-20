import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const { option, aboutInstructions } = body;
      const linkedinContent = body.linkedinContent.substring(0, 8000);
      let prompt: string = "";
      await startDB();
      const promptRec = await Prompt?.findOne({
        type: "linkedin",
        name: option,
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";
      if (option === "aboutInstructions") {
        prompt = await prompt.replaceAll("{{instructions}}", aboutInstructions);
      }

      if (linkedinContent) {
        const dataset = "linkedin.abouts";
        const model = await getTrainedModel(dataset);
        //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

        const input = `Read Person's resume :
                ${linkedinContent}
    
                and then:
                ${prompt}`;

        const response: any = await openai.chat.completions.create({
          model: model ? model : "gpt-3.5-turbo",
          stream: true,
          messages: [{ role: "user", content: input }],
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
