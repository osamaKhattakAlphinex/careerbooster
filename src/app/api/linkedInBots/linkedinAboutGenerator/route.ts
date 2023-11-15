import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  try {
    const body = await req.json();

    if (body) {
      const { linkedinContent, option, aboutInstructions } = body;
      let prompt;
      await startDB();
      const promptRec = await Prompt?.findOne({
        type: "linkedinTool",
        name: option,
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";
      if (option === "aboutInstructions") {
        prompt = prompt.replaceAll("{{instructions}}", aboutInstructions);
      }

      if (linkedinContent) {
        const input = `This is the User data:
                ${linkedinContent}
    
                This is the prompt:
                ${prompt}`;

        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
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
