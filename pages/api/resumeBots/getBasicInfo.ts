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

    if (type === "summary") {
      const model1 = new OpenAI({
        streaming: true,
        modelName: "gpt-3.5-turbo",
        callbacks: [
          {
            handleLLMNewToken(token) {
              res.write(token);
            },
          },
        ],
        temperature: 1,
      });

      try {
        const promptRec = await Prompt.findOne({
          type: "resume",
          name: "summary",
          active: true,
        });
        const prompt = promptRec.value;

        const promptSummary = prompt.replace("{{jobPosition}}", jobPosition);
        const chain4 = RetrievalQAChain.fromLLM(model1, vectorStoreRetriever);
        await chain4.call({
          query: promptSummary,
        });

        res.end();
        // return res.status(200).json({
        //   success: true,
        //   data: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
        // });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }

    if (type === "workExperience") {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "workExperienceGeneralDescription",
        active: true,
      });
      const workExperienceGeneralDescription = promptRec.value;

      const promptRec1 = await Prompt.findOne({
        type: "resume",
        name: "workExperienceAchievementDescription",
        active: true,
      });
      const workExperienceAchievementDescription = promptRec1.value;

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
                  achievements: z
                    .array(z.string())
                    .describe(workExperienceAchievementDescription),
                }),
              })
            )
            // "list of three to five accomplishments, achievements results of how the person added value to this company"
            .describe(workExperienceGeneralDescription),
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

    if (type === "primarySkills") {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "primarySkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = promptDB.replace("{{jobPosition}}", jobPosition);

      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          primarySkills: z.array(z.string()).describe(promptRefined),
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

    if (type === "professionalSkills") {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "professionalSkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = promptDB.replace("{{jobPosition}}", jobPosition);
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          professionalSkills: z.array(z.string()).describe(promptRefined),
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

    if (type === "secondarySkills") {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "secondarySkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = promptDB.replace("{{jobPosition}}", jobPosition);
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          secondarySkills: z.array(z.string()).describe(promptRefined),
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
  }
};
export default handler;
