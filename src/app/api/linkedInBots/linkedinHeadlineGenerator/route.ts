// import { OpenAI } from "langchain/llms/openai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

// This function can run for a maximum of 5 seconds
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.linkedinContent;

      let prompt;
      await startDB();
      const promptRec = await Prompt.findOne({
        type: "linkedinTool",
        name: "headline",
        active: true,
      });
      prompt = promptRec ? promptRec.value : "";

      // For LinkedIn Toll  if file is uploaded then load content from that fiel
      if (content) {
        // CREATING LLM MODAL

        const input = `
            This is the User data:
            ${content}
            This is the prompt:
            ${prompt}
            `;

        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // v2
          stream: true,
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        });

        // const resp = await chain4.call({ query: input });
        // return NextResponse.json(
        //   { result: response.choices[0].message.content, success: true },
        //   { status: 200 }
        // );
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
