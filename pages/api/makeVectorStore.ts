import { NextApiHandler } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const index = process.env.PINECONE_INDEX;

  if (req.body && apiKey && environment && index) {
    const reqBody = JSON.parse(req.body);
    const email = reqBody.email;
    const dir = path.join(process.cwd() + "/public", "/files", `/${email}`);
    const loader = new DirectoryLoader(dir, {
      ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await loader.load();

    // pinecone
    const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");

    const namespace = `cph-resume-db.${email}`;
    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);

    // { embedding: "2dsphere" },
    // { dimensions: 1024, similarity: "euclidean", type: "knnVector" }

    await MongoDBAtlasVectorSearch.fromDocuments(docs, new OpenAIEmbeddings(), {
      collection,
      indexName: "default", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });
    await collection.createIndex({ text: "text" });
    await collection.createIndex({
      embedding: "2dsphere",
    });

    await client.close();

    res.status(200).json({ success: true });
  }

  try {
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};
export default handler;
