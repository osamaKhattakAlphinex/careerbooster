import { NextApiHandler } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";

import { loadQARefineChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.body) {
      const reqBody = JSON.parse(req.body);
      const file = reqBody.file;
      const dir = path.join(process.cwd() + "/public", "/files");
      const loader = new PDFLoader(`${dir}/${file}`);
      // const docs = await loader.load();

      // Create the models and chain
      const embeddings = new OpenAIEmbeddings();
      const model = new OpenAI({ temperature: 1 });
      const chain = loadQARefineChain(model);

      const docs = await loader.loadAndSplit();
      const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

      res.status(200).json({ success: true, store });
    }
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};
export default handler;
