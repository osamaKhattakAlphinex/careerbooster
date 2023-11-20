import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const userData = reqBody.userData;
    const trainBotData = reqBody.trainBotData;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "keyword",
      active: true,
    });
    const prompt = promptRec.value;

    // CREATING LLM MODAL
    const model = new ChatOpenAI({
      streaming: true,
      modelName: "gpt-3.5-turbo",
      //   callbacks: [
      //     {
      //       handleLLMNewToken(token) {
      //         res.write(token);
      //       },
      //     },
      //   ],
      temperature: 0.5,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Keywords for the person LinkedIn Profile.
        Following are the content of the resume (in JSON format): 
        JSON user/resume data: {userData}
        `),
      HumanMessagePromptTemplate.fromTemplate("{prompt}"),
    ]);
    const chainB = new LLMChain({
      prompt: chatPrompt,
      llm: model,
    });

    const resp = await chainB.call({
      userData: JSON.stringify(userData),
      prompt,
    });

    // make a trainBot entry
    try {
      if (trainBotData) {
        const obj = {
          type: "linkedin.generateKeywords",
          input: prompt,
          output: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Generate LinkedIn Keywords for ${trainBotData.userEmail}`,
        };

        await TrainBot.create({ ...obj });
      }
    } catch (error) {}

    return NextResponse.json(
      { result: resp.text.replace(/(\r\n|\n|\r)/gm, ""), success: true },
      { status: 200 }
    );
    // res.end();
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
