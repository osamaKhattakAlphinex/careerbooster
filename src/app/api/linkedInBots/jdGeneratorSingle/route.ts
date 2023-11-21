import { NextApiHandler } from "next";
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
    const experience = reqBody.experience;
    const trainBotData = reqBody.trainBotData;

    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "jobDescription",
      active: true,
    });
    const prompt = promptRec.value;

    // CREATING MODAL
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
      SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that helps Writing Individual Job Description for a person for his Resume.
      The Resume Data is as follows:
      Job Title: {jobTitle}
      Company Name: {company}
      From Month: {fromMonth}
      From Year: {fromYear}
      To Month: {toMonth}
      To Year: {toYear}
      is the job continued: {isContinue}
      Job Description: {description}
      Company country: {country}
      Company city,State: {cityState}
      `),
      HumanMessagePromptTemplate.fromTemplate("{prompt}"),
    ]);
    const chainB = new LLMChain({
      prompt: chatPrompt,
      llm: model,
    });

    const resp = await chainB.call({
      jobTitle: experience.jobTitle,
      company: experience.company,
      fromMonth: experience.fromMonth,
      fromYear: experience.fromYear,
      toMonth: experience.toMonth,
      toYear: experience.toYear,
      isContinue: experience.isContinue ? "yes" : "no",
      description: experience.description,
      country: experience.country,
      cityState: experience.cityState,
      prompt,
    });

    // make a trainBot entry
    try {
      if (trainBotData) {
        const obj = {
          type: "linkedin.generateJD",
          input: prompt,
          output: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `LinkedIn Job Description for [${experience.jobTitle}] at [${experience.company}]`,
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
