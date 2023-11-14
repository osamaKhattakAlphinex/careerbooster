// import { OpenAI } from "langchain/llms/openai";
import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

// This function can run for a maximum of 5 seconds
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.linkedinContent.slice(0, 4000);

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
        // load file
        // const dir = path.join(
        //   process.cwd() + "/public",
        //   "/files",
        //   `/linkedin-temp`
        // );
        // const loader = new PDFLoader(`${dir}/${fileName}`);
        // const docs = await loader.load();

        // let contentTxt = docs.map((doc: any) => doc.pageContent);
        // const content = contentTxt.join(" ");

        // CREATING LLM MODAL
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const input = `
            This is the User data:
            ${content}
            This is the prompt:
            ${prompt}
            `;

        try {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // v2
            messages: [
              {
                role: "user",
                content: input,
              },
            ],
            temperature: 1,
            max_tokens: 456,
          });

          // const resp = await chain4.call({ query: input });
          return NextResponse.json(
            { result: response.choices[0].message.content, success: true },
            { status: 200 }
          );
        } catch (error) {
          return NextResponse.json(
            { result: error, success: false },
            { status: 400 }
          );
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
