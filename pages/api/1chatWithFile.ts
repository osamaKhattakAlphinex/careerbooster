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

import { RetrievalQAChain } from "langchain/chains";

const handler: NextApiHandler = async (req, res) => {
  // const apiKey = process.env.PINECONE_API_KEY;
  // const index = process.env.PINECONE_INDEX;
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const email = reqBody.email;
    // const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
    // const namespace = `cph-resume-db.${email}`;

    // const [dbName, collectionName] = namespace.split(".");

    // const collection = client.db(dbName).collection(collectionName);

    // const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings(), {
    //   collection,
    //   indexName: "default", // The name of the Atlas search index. Defaults to "default"
    //   textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
    //   embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    // });

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

    const dir = path.join(
      process.cwd() + "/public",
      "/files",
      "/userResumes",
      `/${email}`
    );
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
      query: reqBody.question,
    });

    res.end();
  }
};
export default handler;
