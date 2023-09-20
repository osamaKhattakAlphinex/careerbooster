import { NextApiHandler } from "next";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import Prompt from "@/db/schemas/Prompt";

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  if (req.body) {
    const reqBody = JSON.parse(req.body);
    // const email = reqBody.email;
    const type = reqBody.type; // request type
    const inputType = reqBody.inputType; // input type
    const aiInputFile = reqBody.aiInputFile; // input file
    const jobPosition = reqBody.jobPosition;
    const userData = reqBody.userData;
    const email = reqBody.email;

    let content: any;
    if (inputType === "file") {
      // Read content from the user file
      // load file
      const dir = path.join(process.cwd() + "/public", "/files", `/${email}`);
      const loader = new PDFLoader(`${dir}/${aiInputFile}`);
      const docs = await loader.load();

      let contentTxt = docs.map((doc: any) => doc.pageContent);
      const FileTxt = contentTxt.join(" ");
      content = { userData: FileTxt };
    } else if (inputType === "userData") {
      // pass user data as it is
      content = userData;
    }
    // CREATING LLM MODAL
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.5,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Keywords for the person LinkedIn Profile.
        Following are the content of the resume (in JSON format): 
        JSON user/resume data: {userData}

        {format_instructions}
        `),
      HumanMessagePromptTemplate.fromTemplate("{prompt}"),
    ]);

    const chainB = new LLMChain({
      prompt: chatPrompt,
      llm: model,
    });

    if (type === "basicDetails") {
      try {
        // Parser Instructions
        const parser = StructuredOutputParser.fromZodSchema(
          z.object({
            shortName: z
              .string()
              .describe("two letters from Name for short name"),
            jobTitle: z.string().describe("jobTitle OR Desgination "),
            contact: z.object({
              linkedIn: z.string().describe("LinkedInUrl"),
            }),
          })
        );
        const formatInstructions = parser.getFormatInstructions();

        const resp = await chainB.call({
          userData: JSON.stringify(content),
          format_instructions: formatInstructions,
          prompt: "Answer should be a valid JSON",
        });

        return res.status(200).json({
          success: true,
          data: resp.text.replace(/(\r\n|\n|\r)/gm, ""),
        });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    }

    if (type === "summary") {
      try {
        // For summary we need to use another LLM model
        const model1 = new ChatOpenAI({
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
        const promptRec = await Prompt.findOne({
          type: "resume",
          name: "summary",
          active: true,
        });
        const prompt = promptRec.value;

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Professional Summary for a user Resume/CV.
            Following are the content of the resume (in JSON format): 
            JSON user/resume data: {userData}
    
            `),
          HumanMessagePromptTemplate.fromTemplate("{prompt}"),
        ]);
        const promptSummary = prompt.replace("{{jobPosition}}", jobPosition);

        const chainC = new LLMChain({
          prompt: chatPrompt,
          llm: model1,
        });

        await chainC.call({
          userData: JSON.stringify(content),
          prompt: promptSummary,
        });

        res.end();
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

      try {
        const resp = await chainB.call({
          userData: JSON.stringify(content),
          format_instructions: formatInstructions,
          prompt: "Answer should be a valid JSON",
        });

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

      try {
        const resp = await chainB.call({
          userData: JSON.stringify(content),
          format_instructions: formatInstructions,
          prompt: "Answer should be a valid JSON",
        });

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
      try {
        const resp = await chainB.call({
          userData: JSON.stringify(content),
          format_instructions: formatInstructions,
          prompt: "Answer should be a valid JSON",
        });

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
      try {
        const resp = await chainB.call({
          userData: JSON.stringify(content),
          format_instructions: formatInstructions,
          prompt: "Answer should be a valid JSON",
        });

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
