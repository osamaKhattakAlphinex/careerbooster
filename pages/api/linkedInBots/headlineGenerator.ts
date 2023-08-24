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
import Prompt from "@/db/schemas/Prompt";

const handler: NextApiHandler = async (req, res) => {
  try {
    const reqBody = JSON.parse(req.body);
    const email = reqBody.email;

    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "headline",
      active: true,
    });
    const prompt = promptRec.value;

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
      query: prompt,
    });

    res.end();
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
export default handler;
