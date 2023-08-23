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
          education: z.object({
            year: z.string().describe("Year of completing Latest Education"),
            degree: z
              .string()
              .describe("Latest Education degree or certificate name"),
            school: z
              .string()
              .describe("school / college / university of latest education"),
          }),
          summary: z.string().describe(
            `Rewrite a Strong summary for the targeted job position '${jobPosition}' In this executive summary, I want you to provide a professional introduction explaining the present role and framing past job titles. 
              Highlight successes and the services I can offer to potential clients. Mention achievements, and highlight some of the relevant keywords. The word count should not be more than 150 words`
          ),
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
                  achievements: z.array(z.string()).describe(
                    `Rewrite it to make it more professional.
                    this should be three to five bullet points that highlight key accomplishments. 
                      Use this formula when writing about achievements for the role: success verb + noun + metric + outcome`
                  ),
                }),
              })
            )
            // "list of three to five accomplishments, achievements results of how the person added value to this company"
            .describe(
              "Rewrite the List of companies I have worked with, including desgination, from date, to date, name of company and job desciption"
            ),
          primarySkills: z
            .array(z.string())
            .describe(
              `list of 15 primary skills for a job position of '${jobPosition}'`
            ),
          professionalSkills: z
            .array(z.string())
            .describe(
              `list of 20 Professional skills, Do not include any skill already mentioned in the primary skills`
            ),
          secondarySkills: z
            .array(z.string())
            .describe(
              `List of 20 Secondary Supporting Skills do not include any skills which are already mentioned in the primary or professional skills`
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
