import { NextResponse } from "next/server";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import Prompt from "@/db/schemas/Prompt";
import OpenAI from "openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import TrainBot from "@/db/schemas/TrainBot";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  if (req) {
    const reqBody = await req.json();
    // const email = reqBody.email;
    const type = reqBody?.type; // request type
    const inputType = reqBody?.inputType; // input type
    const jobPosition = reqBody?.jobPosition;
    const userData = reqBody?.userData;
    // const email = reqBody?.email;
    const trainBotData = reqBody?.trainBotData;

    let content: any;
    // if (inputType === "file") {
    //   // Read content from the user file
    //   // load file
    //   const dir = path.join(process.cwd() + "/public", "/files", `/${email}`);
    //   const loader = new PDFLoader(`${dir}/${aiInputFile}`);
    //   const docs = await loader.load();

    //   let contentTxt = docs.map((doc: any) => doc.pageContent);
    //   const FileTxt = contentTxt.join(" ");
    //   content = { userData: FileTxt };
    // }
    if (userData || inputType === "userData") {
      // pass user data as it is
      content = userData;
    }

    if (type === "basicDetails") {
      // try {
      // CREATING LLM MODAL

      // const model = new ChatOpenAI({
      //   modelName: "gpt-3.5-turbo",
      //   temperature: 0.5,
      // });
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          shortName: z
            .string()
            .describe("two letters from Name for short name"),
          jobTitle: z
            .string()
            .describe("Write a one line slogan for this person "),
          contact: z.object({
            linkedIn: z.string().describe("LinkedInUrl"),
          }),
        })
      );
      const formatInstructions = parser.getFormatInstructions();
      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
        Following are the content of the resume (in JSON format): 
        JSON user/resume data: ${JSON.stringify(content)}

        Thse are the instructions:
        ${formatInstructions}`;
      // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
      // Following are the content of the resume (in JSON format):
      // JSON user/resume data: {userData}

      // {format_instructions}
      // `),
      //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      // ]);

      // const chainB = new LLMChain({
      //   prompt: chatPrompt,
      //   llm: model,
      // });
      // Parser Instructions

      // const resp = await chainB.call({
      //   userData: JSON.stringify(content),
      //   format_instructions: formatInstructions,
      //   prompt: "Answer should be a valid JSON",
      // });
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });
      // const jsonResponse = extractJSONFromString(
      //   response?.choices[0]?.message?.content
      // );
      // console.log(jsonResponse);
      // make a trainBot entry
      try {
        if (trainBotData) {
          // const responseForTraining = await openai.chat.completions.create({
          //   model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg", // v2
          //   messages: [
          //     {
          //       role: "user",
          //       content: inputPrompt,
          //     },
          //   ],
          //   temperature: 1,
          // });
          const obj = {
            type: "resume.getBasicInfo",
            input: formatInstructions,
            output: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Get basic information for the resume`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}

      return NextResponse.json(
        {
          result: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          success: true,
        },
        { status: 200 }
      );
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 404 }
      //   );
      // }
    }

    if (type === "summary") {
      // try {
      // For summary we need to use another LLM model
      // const model1 = new ChatOpenAI({
      //   streaming: true,
      //   modelName: "gpt-3.5-turbo",
      //   //   callbacks: [
      //   //     {
      //   //       handleLLMNewToken(token) {
      //   //         res.write(token);
      //   //       },
      //   //     },
      //   //   ],
      //   temperature: 0.5,
      // });

      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "summary",
        active: true,
      });
      const prompt = promptRec.value;

      // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps Writing Professional Summary for a user Resume/CV.
      //     Following are the content of the resume (in JSON format):
      //     JSON user/resume data: {userData}

      //     `),
      //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      // ]);
      const promptSummary = prompt.replace("{{jobPosition}}", jobPosition);

      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps Writing Professional Summary for a user Resume/CV.
            Following are the content of the resume (in JSON format): 
            JSON user/resume data: ${JSON.stringify(content)}
            
            This is the prompt:
                ${promptSummary}`;
      // const chainC = new LLMChain({
      //   prompt: chatPrompt,
      //   llm: model1,
      // });

      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });

      // make a trainBot entry

      try {
        if (trainBotData) {
          const obj = {
            type: "resume.writeSummary",
            input: promptSummary,
            output: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Write Summary for the resume`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}
      const stream = OpenAIStream(response);
      // Respond with the stream
      return new StreamingTextResponse(stream);
      // return NextResponse.json(
      //   { result: output, success: true },
      //   { status: 200 }
      // );
      // res.end();
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 404 }
      //   );
      // }
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

      // try {
      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
        Following are the content of the resume (in JSON format): 
        JSON user/resume data: ${JSON.stringify(content)}

        ${formatInstructions}`;
      // const resp = await chainB.call({
      //   userData: JSON.stringify(content),
      //   format_instructions: formatInstructions,
      //   prompt: "Answer should be a valid JSON",
      // });
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });
      const stream = OpenAIStream(response);
      // Respond with the stream
      return new StreamingTextResponse(stream);
      // return NextResponse.json(
      //   { result: resp.text.replace(/(\r\n|\n|\r)/gm, ""), success: true },
      //   { status: 200 }
      // );
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 400 }
      //   );
      // }
    }

    if (type === "primarySkills") {
      // try {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "primarySkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = await promptDB.replace(
        "{{jobPosition}}",
        jobPosition
      );

      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          primarySkills: z.array(z.string()).describe(promptRefined),
        })
      );

      const formatInstructions = parser.getFormatInstructions();

      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
           Following are the content of the resume (in JSON format): 
           JSON user/resume data: ${JSON.stringify(content)}

           These are the instructions:
           ${formatInstructions}`;

      // const model = new ChatOpenAI({
      //   modelName: "gpt-3.5-turbo",
      //   temperature: 0.5,
      // });
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });
      // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
      //   Following are the content of the resume (in JSON format):
      //   JSON user/resume data: {userData}

      //   {format_instructions}
      //   `),
      //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      // ]);

      // const chainB = new LLMChain({
      //   prompt: chatPrompt,
      //   llm: model,
      // });
      // const resp = await chainB.call({
      //   userData: JSON.stringify(content),
      //   format_instructions: formatInstructions,
      //   prompt: "Answer should be a valid JSON",
      // });

      // make a trainBot entry
      try {
        if (trainBotData) {
          const obj = {
            type: "resume.writePrimarySkills",
            input: formatInstructions,
            output: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Write Primary Skills for Resume`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}

      return NextResponse.json(
        {
          result: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          success: true,
        },
        { status: 200 }
      );
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 404 }
      //   );
      // }
    }

    if (type === "professionalSkills") {
      // try {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "professionalSkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = await promptDB.replace(
        "{{jobPosition}}",
        jobPosition
      );
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          professionalSkills: z.array(z.string()).describe(promptRefined),
        })
      );

      const formatInstructions = parser.getFormatInstructions();

      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
           Following are the content of the resume (in JSON format): 
           JSON user/resume data: ${JSON.stringify(content)}

           These are the instructions:
           ${formatInstructions}`;

      // CREATING LLM MODAL

      // const model = new ChatOpenAI({
      //   modelName: "gpt-3.5-turbo",
      //   temperature: 0.5,
      // });

      // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
      //   Following are the content of the resume (in JSON format):
      //   JSON user/resume data: {userData}

      //   {format_instructions}
      //   `),
      //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      // ]);

      // const chainB = new LLMChain({
      //   prompt: chatPrompt,
      //   llm: model,
      // });
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });
      // const resp = await chainB.call({
      //   userData: JSON.stringify(content),
      //   format_instructions: formatInstructions,
      //   prompt: "Answer should be a valid JSON",
      // });

      // make a trainBot entry
      try {
        if (trainBotData) {
          const obj = {
            type: "resume.writeProfessionalSkills",
            input: formatInstructions,
            output: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Write Professional Skills for Resume`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}

      return NextResponse.json(
        {
          result: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          success: true,
        },
        { status: 200 }
      );
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 404 }
      //   );
      // }
    }

    if (type === "secondarySkills") {
      // try {
      const promptRec = await Prompt.findOne({
        type: "resume",
        name: "secondarySkills",
        active: true,
      });
      const promptDB = promptRec.value;

      const promptRefined = await promptDB.replace(
        "{{jobPosition}}",
        jobPosition
      );
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          secondarySkills: z.array(z.string()).describe(promptRefined),
        })
      );

      const formatInstructions = parser.getFormatInstructions();
      const inputPrompt = `You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
           Following are the content of the resume (in JSON format): 
           JSON user/resume data: ${JSON.stringify(content)}

           These are the instructions:
           ${formatInstructions}`;
      // CREATING LLM MODAL

      // const model = new ChatOpenAI({
      //   modelName: "gpt-3.5-turbo",
      //   temperature: 0.5,
      // });

      // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      //   SystemMessagePromptTemplate.fromTemplate(`You are a helpful assistant that Reads the Resume data of a person and helps with creating a new Resume.
      //   Following are the content of the resume (in JSON format):
      //   JSON user/resume data: {userData}

      //   {format_instructions}
      //   `),
      //   HumanMessagePromptTemplate.fromTemplate("{prompt}"),
      // ]);

      // const chainB = new LLMChain({
      //   prompt: chatPrompt,
      //   llm: model,
      // });

      // const resp = await chainB.call({
      //   userData: JSON.stringify(content),
      //   format_instructions: formatInstructions,
      //   prompt: "Answer should be a valid JSON",
      // });
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        // stream: true,
        messages: [{ role: "user", content: inputPrompt }],
      });
      // make a trainBot entry
      try {
        if (trainBotData) {
          const obj = {
            type: "resume.writeSecondarySkills",
            input: formatInstructions,
            output: response?.choices[0]?.message?.content?.replace(
              /(\r\n|\n|\r)/gm,
              ""
            ),
            idealOutput: "",
            status: "pending",
            userEmail: trainBotData.userEmail,
            fileAddress: trainBotData.fileAddress,
            Instructions: `Write Secondary Skills for Resume`,
          };

          await TrainBot.create({ ...obj });
        }
      } catch (error) {}

      return NextResponse.json(
        {
          result: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          success: true,
        },
        { status: 200 }
      );
      // } catch (error) {
      //   return NextResponse.json(
      //     { result: error, success: false },
      //     { status: 404 }
      //   );
      // }
    }
  }
}
