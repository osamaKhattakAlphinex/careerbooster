import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();

    if (body) {
      const { linkedinContent, option, aboutInstructions } = body;

      let prompt = `Write a maximum of 2000 characters copy for the “About Section” of my LinkedIn based on the data you have. Use the following instructions.
    
          - It should be detailed but compact, and engaging
    
          - Use relevant industry jargon as necessary. Make sure to provide a brief rundown of the main technical skills related to my job title.
    
          - Hook the audience right away and make the first sentence count by showing passion.
    
          - Provide a professional introduction explaining the present role and framing past job titles.
    
          - Highlight successes and the services I can offer to potential clients.
    
          - Include a call to action.
    
          Just give me the answer not add any extra labels
    
          pleas write this text the {"About Default Prompt"} in  last`;

      if (linkedinContent) {
        const model1 = new ChatOpenAI({
          streaming: true,
          modelName: "gpt-3.5-turbo",
          //   callbacks: [
          //     {
          //       handleLLMNewToken(token) {
          //         console.log(token);
          //         res.write(token);
          //       },
          //     },
          //   ],
          temperature: 0.5,
        });

        const input = `This is the User data:
                ${linkedinContent}
    
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
          userData: JSON.stringify(linkedinContent),
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
