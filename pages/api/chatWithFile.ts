import { NextApiHandler } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";

const handler: NextApiHandler = async (req, res) => {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const index = process.env.PINECONE_INDEX;
  if (req.body && apiKey && environment && index) {
    const reqBody = JSON.parse(req.body);

    const client = new PineconeClient();
    await client.init({
      apiKey,
      environment,
    });
    const pineconeIndex = client.Index(index);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );

    const model = new OpenAI({
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            res.write(token);
          },
        },
      ],
    });

    const chain3 = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory: new BufferMemory({
          memoryKey: "chat_history", // Must be set to "chat_history"
        }),
      }
    );

    await chain3.call({ question: reqBody.question });

    res.end();
  }
};
export default handler;
