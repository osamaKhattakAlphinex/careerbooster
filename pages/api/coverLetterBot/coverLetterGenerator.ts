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

// PROMPT
// Here is the Job description:
// {{jobDescription}}

// based on the provided data about user and job description write an amazing cover letter.

// The answer must be formatted and returned as HTML

const handler: NextApiHandler = async (req, res) => {
  try {
    const reqBody = JSON.parse(req.body);
    const type = reqBody.type;
    const userData = reqBody.userData;
    const email = reqBody.email;
    const file = reqBody.file;
    const resumeId = reqBody.resumeId;
    const jobDescription = reqBody.jobDescription;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "coverLetter",
      name: "coverLetterWriter",
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = promptDB.replace("{{jobDescription}}", jobDescription);

    // CREATING LLM MODAL
    const model = new ChatOpenAI({
      streaming: true,
      modelName: "gpt-3.5-turbo",
      callbacks: [
        {
          handleLLMNewToken(token) {
            res.write(token);
          },
        },
      ],
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

      res.end();
    } else {
      // this will run for both TYPES aiResume and profile
      console.log("here");
      const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Cover Letter for the person.
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

      res.end();
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export default handler;
