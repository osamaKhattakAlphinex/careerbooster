import { NextApiHandler } from "next";
// import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAI } from "langchain/llms/openai";
// import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
// import { MongoClient } from "mongodb";
import path from "path";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

const handler: NextApiHandler = async (req, res) => {
  const reqBody = JSON.parse(req.body);
  const email = reqBody.email;

  // CREATING LLM MODAL
  const model = new OpenAI({
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

  // TESTING WITH MEMORY VECTOR STORE
  const dir = path.join(process.cwd() + "/public", "/files", `/${email}`);
  const loader = new DirectoryLoader(dir, {
    ".pdf": (path) => new PDFLoader(path),
  });
  const docs = await loader.load();
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );

  // Initialize a retriever wrapper around the vector store
  const vectorStoreRetriever = vectorStore.asRetriever();

  const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
  await chain4.call({
    query: `I want you to read read my resume data that you already have and Write a LinkedIn headline for the job seeker using the headline formula below. 


    Job Title |Top Keyword 1 | Top Keyword 2 | Top Keyword 3 | Top Keyword 4 | Value proposition statement
    
    For example, a Marketing Director could use a headline like "Marketing Director | Social Media Expert | Email Marketing | PPC Expert |  Customer Engagement & Retention | Passionate About Mission Focused Brands & Companies.
    `,
  });

  res.end();
  // try {

  // } catch (error) {
  //   return res.status(500).json({ success: false, error });
  // }
};
export default handler;
