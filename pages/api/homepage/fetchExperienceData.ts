import { NextApiHandler } from "next";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { RetrievalQAChain } from "langchain/chains";

import { z } from "zod";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    const file = reqBody.file;
    if (file) {
      // CREATING LLM MODAL
      const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
      });

      // load file
      const dir = path.join(process.cwd() + "/public", "/files", `/temp`);
      const loader = new PDFLoader(`${dir}/${file}`);
      const docs = await loader.load();

      // load vector store
      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings()
      );

      const vectorStoreRetriever = vectorStore.asRetriever();

      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          experiences: z
            .array(
              z.object({
                fields: z.object({
                  // id: z.string().describe("random non-repeated id"),
                  jobTitle: z.string().describe("Job Title e.g. Software Dev"),
                  // company: z
                  //   .string()
                  //   .describe("Company Name e.g. Google, Facebook, etc"),
                  // country: z
                  //   .string()
                  //   .describe("Country Name e.g. Nigeria, United States, etc"),
                  // cityState: z
                  //   .string()
                  //   .describe(
                  //     "City and State e.g. Lagos, Lagos State, New York, New York State, etc"
                  //   ),
                  // fromMonth: z
                  //   .string()
                  //   .describe("Job Starting Month e.g May, January"),
                  // fromYear: z
                  //   .string()
                  //   .describe("Job Starting Year e.g 2023, 1997"),
                  // isContinue: z
                  //   .boolean()
                  //   .describe("Is Experience continued? e.g true, false"),
                  // toMonth: z.string().describe("Job Ending Month "),
                  // toYear: z.string().describe("Job Ending Year"),
                  // description: z
                  //   .string()
                  //   .describe(
                  //     "Short Description About the Job e.g I did this and that"
                  //   ),
                }),
              })
            )
            .describe(
              "List of all Educations from the provided Data without Skipping any of the Education. Each education has the following fields: id, company, educationLevel, fieldOfStudy, schoolName, schoolLocation, fromMonth, fromYear, isContinue, toMonth, toYear. The Array you return must be sorted by year the latest one on top and oldest on the bottom"
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
        additionalInfo: "Answer should be a valid JSON",
      });

      try {
        const chain4 = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
        const resp = await chain4.call({ query: input });
        return res.status(200).json({ success: true, data: resp });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }
  }
};
export default handler;
