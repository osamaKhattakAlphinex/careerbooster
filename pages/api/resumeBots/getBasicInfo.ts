import { NextApiHandler } from "next";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import path from "path";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { RetrievalQAChain } from "langchain/chains";

import { z } from "zod";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const email = reqBody.email;
    const type = reqBody.type;
    const jobPosition = reqBody.jobPosition;

    // CREATING LLM MODAL
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
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

    const vectorStoreRetriever = vectorStore.asRetriever();

    if (type === "basicInfo") {
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          shortName: z
            .string()
            .describe("two letters from Name for short name"),
          name: z.string().describe("Full Name"),
          jobTitle: z.string().describe("jobTitle OR Desgination "),
          contact: z.object({
            phone: z.string().describe("Phone number"),
            email: z.string().describe("Email Address"),
            linkedIn: z.string().describe("LinkedInUrl"),
          }),
          //   sources: z
          //     .array(z.string())
          //     .describe(
          //       "sources used to answer the question, should be websites."
          //     ),
        })
      );
      const formatInstructions = parser.getFormatInstructions();
      const prompt = new PromptTemplate({
        template:
          "Answer the users question as best as possible from the provided resume data that you already have about a person.\n{format_instructions}\n{additionalInfo}",
        inputVariables: ["additionalInfo"],
        partialVariables: { format_instructions: formatInstructions },
      });

      const input = await prompt.format({
        additionalInfo: "Answer should be a valid JSON",
      });
      const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
      const resp = await chain4.call({ query: input });
      return res.status(200).json({ success: true, data: resp });
    }
  }
};
export default handler;
