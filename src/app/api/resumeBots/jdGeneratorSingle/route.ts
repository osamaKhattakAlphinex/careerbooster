import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
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
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: any) {
  // try {
  const reqBody = await req.json();
  const experience = reqBody?.experience;
  const trainBotData = reqBody?.trainBotData;

  // CREATING MODAL
  // const model = new ChatOpenAI({
  //   streaming: true,
  //   modelName: "gpt-3.5-turbo",
  //   //   callbacks: [
  //   //     {
  //   //       handleLLMNewToken(token) {
  //   //         res.write(token);
  //   //       },
  //   //     },
  //   //   ],
  //   temperature: 0.5,
  // });

  // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that helps Writing Individual Job Description for a person for his Resume.
  //   The Resume Data is as follows:
  //   Job Title: {jobTitle}
  //   Company Name: {company}
  //   From Month: {fromMonth}
  //   From Year: {fromYear}
  //   To Month: {toMonth}
  //   To Year: {toYear}
  //   is the job continued: {isContinue}
  //   Job Description: {description}
  //   Company country: {country}
  //   Company city,State: {cityState}
  //   `),
  //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
  // ]);
  // const chainB = new LLMChain({
  //   prompt: chatPrompt,
  //   llm: model,
  // });

  const promptRec = await Prompt.findOne({
    type: "resume",
    name: "jdSingle",
    active: true,
  });
  const prompt = promptRec.value;

  const inputPrompt = `You are a helpful assistant that helps Writing Individual Job Description for a person for his Resume.
      The Resume Data is as follows:
      Job Title: ${experience.jobTitle}
      Company Name: ${experience.company}
      From Month: ${experience.fromMonth}
      From Year: ${experience.fromYear}
      To Month: ${experience.toMonth}
      To Year: ${experience.toYear}
      is the job continued: ${experience.isContinue}
      Job Description: ${experience.description}
      Company country: ${experience.country}
      Company city,State: ${experience.cityState}
      
      This is the prompt:
      ${prompt}
      `;
  const response: any = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [{ role: "user", content: inputPrompt }],
  });
  const responseForTraining = await openai.chat.completions.create({
    model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg", // v2
    messages: [
      {
        role: "user",
        content: inputPrompt,
      },
    ],
    temperature: 1,
  });
  // const output = await chainB.call({
  //   jobTitle: experience.jobTitle,
  //   company: experience.company,
  //   fromMonth: experience.fromMonth,
  //   fromYear: experience.fromYear,
  //   toMonth: experience.toMonth,
  //   toYear: experience.toYear,
  //   isContinue: experience.isContinue ? "yes" : "no",
  //   description: experience.description,
  //   country: experience.country,
  //   cityState: experience.cityState,
  //   prompt,
  // });
  // make a trainBot entry
  try {
    if (trainBotData) {
      const obj = {
        type: "resume.writeJDSingle",
        input: prompt,
        output: responseForTraining?.choices[0]?.message?.content?.replace(
          /(\r\n|\n|\r)/gm,
          ""
        ),
        idealOutput: "",
        status: "pending",
        userEmail: trainBotData.userEmail,
        fileAddress: trainBotData.fileAddress,
        Instructions: `Write Single Job Description for ${experience.jobTitle} at ${experience.company}`,
      };

      await TrainBot.create({ ...obj });
    }
  } catch (error) {}

  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
  // return NextResponse.json(
  //   { result: output.text.replace(/(\r\n|\n|\r)/gm, ""), success: true },
  //   { status: 200 }
  // );
  // res.end();
  // } catch (error) {
  //   return NextResponse.json(
  //     { result: "Something went wrong", success: false },
  //     { status: 404 }
  //   );
  // }
}
