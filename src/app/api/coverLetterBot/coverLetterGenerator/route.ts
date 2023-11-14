import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import Prompt from "@/db/schemas/Prompt";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { RetrievalQAChain } from "langchain/chains";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const reqBody = await req.json();
    const type = reqBody.type;
    const userData = reqBody.userData;
    const email = reqBody.email;
    const file = reqBody.file;
    const resumeId = reqBody.resumeId;
    const jobDescription = reqBody.jobDescription;
    const trainBotData = reqBody.trainBotData;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "bid",
      name: "consulting",
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = promptDB.replace("{{jobDescription}}", jobDescription);

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

    if (type === "file") {
      const dir = path.join(
        process.cwd() + "/public",
        "/files",
        "/userResumes",
        `/${email}`,
        `/${file}`
      );

      const loader = new PDFLoader(dir);

      const docs = await loader.load();

      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings()
      );

      const vectorStoreRetriever = vectorStore.asRetriever();

      const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
      await chain4.call({ query: prompt });

      //   res.end();
    } else {
      // this will run for both TYPES aiResume and profile
      const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Bid for a job position for the person who is a consultant.
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
            type: "linkedin.genearteConsultingBid",
            input: prompt,
            output: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Generate Consulting Bid for ${trainBotData.userEmail}`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}

      return NextResponse.json(
        { result: resp.text.replace(/(\r\n|\n|\r)/gm, ""), success: true },
        { status: 200 }
      );
      //   res.end();
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
