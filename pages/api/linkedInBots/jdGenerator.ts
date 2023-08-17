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
    query: `I want you to read read my resume data that you already have and get my job description
    Rewrite every job experience Based on the following instruction:

    The "Experience" section is crucial once you have caught the attention of potential recruiters. Use this section to showcase successes and work experiences. Make this section comprehensive.

    Make sure to include metrics in job descriptions for each role, as they help build proof that the person possesses the required skills. 

    Use this formula when writing about achievements for the role: success verb + noun + metric + outcome.

    To stand out, add three to five bullet points that highlight key accomplishments. These could be core achievements and the key results of how the person added value to his/her company. Using tangible results can help catch attention.

    i want you to keep the following format for every job decription:
    Founder & "Chief Empowerment Officer" 
    Northstar Alchemy LLC | September 2022 - Present

    Dedicated to catalyzing personal and professional growth through transformative dialogues and inspirational exchanges. Our mission is to equip individuals and organizations with tools and guidance to reshape perspectives, unleash latent potential, and foster enduring positive transformations.

    Key Achievements:

    Spearheaded the inception and establishment of Northstar Alchemy, fostering a community committed to growth.
    Facilitated transformative conversations that led to a 30% increase in individual engagement and motivation.
    Curated and hosted interactive workshops, reaching 500+ participants and inspiring profound self-discovery.
    Forged collaborations with local businesses, amplifying our impact and extending our network by 40%.
    Empowered professionals to achieve breakthroughs, resulting in enhanced leadership skills and career advancement.
    `,
  });

  res.end();
  // try {

  // } catch (error) {
  //   return res.status(500).json({ success: false, error });
  // }
};
export default handler;
