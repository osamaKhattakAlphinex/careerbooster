import { NextApiHandler } from "next";
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
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
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
    const type = reqBody.type;
    const userData = reqBody.userData;
    const file = reqBody.file;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "biography",
      name: "biographyWriter",
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

    if (type === "file") {
      // TESTING WITH MEMORY VECTOR STORE
      const dir = path.join(
        process.cwd() + "/public",
        "/files",
        "/bio",
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

      await chainB.call({
        userData: JSON.stringify(userData),
        prompt,
      });

      //   res.end();
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
