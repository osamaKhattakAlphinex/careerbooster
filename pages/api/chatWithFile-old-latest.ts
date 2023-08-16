import { NextApiHandler } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const handler: NextApiHandler = async (req, res) => {
  const apiKey = process.env.PINECONE_API_KEY;
  const environment = process.env.PINECONE_ENVIRONMENT;
  const index = process.env.PINECONE_INDEX;
  if (req.body && apiKey && environment && index) {
    const reqBody = JSON.parse(req.body);

    // FETCHING STORE FROM PINECONE
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

    // CREATING LLM MODAL
    const model = new OpenAI({
      streaming: true,
      modelName: "gpt-3.5-turbo",
      // cache: true,
      // n: 1,
      // bestOf: 1,
      callbacks: [
        {
          handleLLMNewToken(token) {
            res.write(token);
          },
        },
      ],
      temperature: 0.5,
    });

    // PROMPT TEMPLATE
    // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //   SystemMessagePromptTemplate.fromTemplate(
    //     "The following is a friendly Conversation between a human and AI. The AI is talkative and provides lots of specific details from it's context. If the AI does not know the answer to a question, it truthfully says it does not know."
    //   ),
    //   new MessagesPlaceholder("history"),
    //   HumanMessagePromptTemplate.fromTemplate("{input}"),
    // ]);
    // const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `
    //   I want you to help me write a professional executive resume for one of my clients. I have provided you the data as text of my resume, and you have to read it first; after that,
    //   I am going to ask a question, and you have to assist me with improving my resume.
    //   My Question is: {question}
    //   Your answer should follow the following format:
    //   \`\`\`
    //   If you don't know the answer, just say that you don't know, don't try to make up an answer.
    //   don't return the answer as it is from the data you have Rewrite it to make it more professional.
    //   ----------------
    //   Standalone question: <Rephrased question here>
    //   \`\`\`
    //   Your answer:`;

    // CREATING CHAIN
    // const chain3 = ConversationalRetrievalQAChain.fromLLM(
    //   model,
    //   vectorStore.asRetriever(),
    //   {
    //     memory: new BufferMemory({
    //       memoryKey: "chat_history", // Must be set to "chat_history"
    //     }),
    //     questionGeneratorChainOptions: {
    //       template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
    //     },
    //   }
    // );
    // await chain4.call({ question: reqBody.question });

    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();

    // const promptTemplate = `I want you to help me write a professional executive resume for one of my clients. I have provided you the data as text of my resume, and you have to read it first;
    // after that I am going to ask a question, and you have to assist me with improving my resume.

    //   Question: {question}
    //   Your Answer: `;
    // const prompt = PromptTemplate.fromTemplate(promptTemplate);

    // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
    const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
    // const chain4 = new RetrievalQAChain({
    //   combineDocumentsChain: loadQAStuffChain(model, { prompt }),
    //   retriever: vectorStore.asRetriever(),
    // });
    await chain4.call({
      query: reqBody.question,
    });
    // await chain4.call({
    //   query: `Answer the following question with a short answer which is only for this question don't add extra information
    //   My question: ${reqBody.question}
    //   Your Answer: `,
    // });
    // res.status(200).json({ result });

    res.end();
  }
};
export default handler;
