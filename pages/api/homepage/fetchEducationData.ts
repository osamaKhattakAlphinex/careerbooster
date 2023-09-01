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
          education: z
            .array(
              z.object({
                fields: z.object({
                  // id: z.string().describe("random non-repeated id"),
                  company: z.string().describe("company name"),
                  educationLevel: z
                    .string()
                    .describe("Education level or Degree Name e.g. Bachelors"),
                  fieldOfStudy: z
                    .string()
                    .describe("Field of Study e.g. Computer Science"),
                  schoolName: z
                    .string()
                    .describe(
                      "School, university, college Name e.g. University of Lagos"
                    ),
                  schoolLocation: z
                    .string()
                    .describe(
                      "Address or Location of School, university, college"
                    ),
                  fromMonth: z
                    .string()
                    .describe("From Month in full e.g May, January"),
                  fromYear: z
                    .string()
                    .describe("From Year in full e.g 2023, 1997"),
                  isContinue: z
                    .boolean()
                    .describe("Is Education continued? e.g true, false"),
                  toMonth: z
                    .string()
                    .describe("To Month in full e.g May, January"),
                  toYear: z.string().describe("To Year in full e.g 2023, 1997"),
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
