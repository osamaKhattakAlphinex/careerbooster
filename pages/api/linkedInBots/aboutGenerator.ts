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
    query: `I want you to read read my resume data that you already have and 
    Write a maximum of 2000 characters for the “About Section” of the job seeker's Linkedin using the instruction below.

    The "About" section of a LinkedIn profile should be a hit, as it sets the tone for the rest of the profile. It should be detailed but compact, engaging, and use relevant industry jargon as necessary. Make sure to provide a brief rundown of the main technical skills related to his job title. 
    
    Here's a breakdown of the content you can include in the detailed 2,000-character description:
    
    Hook the audience right away and make the first sentence count by showing passion and revealing the person's character.
    
    Provide a professional introduction explaining the present role and framing past job titles.
    
    Highlight successes and the services the person can offer to potential clients.
    
    Include a call to action.
    
    Remember, a good LinkedIn summary works like a "trailer" for the rest of the profile. It should show off the most relevant skills and best achievements. Unlike a resume summary, you can get truly personal on the LinkedIn profile by telling a real-life story and revealing the human within.

    Donot use I am or name of the person when writing the about
    
    `,
  });

  res.end();
  // try {

  // } catch (error) {
  //   return res.status(500).json({ success: false, error });
  // }
};
export default handler;
