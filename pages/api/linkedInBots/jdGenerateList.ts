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
import Prompt from "@/db/schemas/Prompt";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const email = reqBody.email;

    // CREATING LLM MODAL
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 1,
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

    // const promptRec = await Prompt.findOne({
    //   type: "resume",
    //   name: "workExperienceGeneralDescription",
    //   active: true,
    // });
    // const workExperienceGeneralDescription = promptRec.value;

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        workExperience: z
          .array(
            z.object({
              fields: z.object({
                title: z.string().describe("Designation"),
                company: z.string().describe("company name"),
                companyAddress: z
                  .string()
                  .describe("Country Name of the company"),
                from: z.string().describe("From date"),
                to: z.string().describe("To date"),
              }),
            })
          )
          .describe(
            // "List of work experience of the person with different companies. Each work experience has the following fields: title, company, companyAddress, from, to"
            "Rewrite the List of companies I have worked with, including desgination, from date, to date, name of company and job desciption"
          ),
      })
    );

    const formatInstructions = parser.getFormatInstructions();
    const prompt = new PromptTemplate({
      template:
        "Answer the users question as best as possible from the provided resume data that you already have about the person.\n{format_instructions}\n{additionalInfo}",
      inputVariables: ["additionalInfo"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({
      additionalInfo: "Important: >> Answer should be a valid JSON <<",
    });

    try {
      const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
      const resp = await chain4.call({ query: input });
      return res.status(200).json({
        success: true,
        data: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
      });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
};
export default handler;
