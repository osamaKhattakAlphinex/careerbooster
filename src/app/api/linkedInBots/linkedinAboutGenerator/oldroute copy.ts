import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import Prompt from "@/db/schemas/Prompt";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

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

      const content = linkedinContent.slice(0, 4000);

      if (content) {
        const model1 = new ChatOpenAI({
          streaming: true,
          modelName: "gpt-3.5-turbo",
          // callbacks: [
          //   {
          //     handleLLMNewToken(token) {
          //       console.log(token);
          //     },
          //   },
          // ],
          temperature: 0.5,
        });

        const input = `This is the User data:
                ${content}
    
                This is the prompt:
                ${prompt}`;

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the User data of a person and helps Writing About for the person LinkedIn.
                Following are the content of the resume (in JSON format):
                JSON user/resume data: {userData}`),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]);
        const promptSummary = input;

        const chainC = new LLMChain({
          prompt: chatPrompt,
          llm: model1,
        });
        const output = await chainC.call({
          userData: JSON.stringify(content),
          prompt: promptSummary,
        });

        return NextResponse.json(
          { result: output, success: true },
          { status: 200 }
        );

        // res.end(); // Close  the stream
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
