import { NextResponse } from "next/server";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import Prompt from "@/db/schemas/Prompt";
import OpenAI from "openai";

import { OpenAIStream, StreamingTextResponse } from "ai";

import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getTrainedModel } from "@/helpers/getTrainedModel";
import { makeid } from "@/helpers/makeid";
import {
  TrainBotEntryType,
  makeTrainedBotEntry,
} from "@/helpers/makeTrainBotEntry";
import { updateUserTotalCredits } from "@/helpers/updateUserTotalCredits";
import User from "@/db/schemas/User";
import { getUserCreditsByEmail } from "@/helpers/getUserCreditsByEmail";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  if (req) {
    const reqBody = await req.json();
    // const email = reqBody.email;
    const type = reqBody?.type; // request type
    const inputType = reqBody?.inputType; // input type
    const jobPosition = reqBody?.jobPosition;
    const userData = reqBody?.userData;
    const personName = reqBody?.personName

    const userCredits = await getUserCreditsByEmail(session?.user?.email);
    const creditsUsed = reqBody?.creditsUsed;
    // const email = reqBody?.email;
    const trainBotData = reqBody?.trainBotData;
    if (userCredits) {
      if (userCredits < creditsUsed) {
        return NextResponse.json(
          { result: "Insufficient Credits", success: false },
          { status: 429 }
        )
      }
    }

    if (type === "basicDetails") {
      const dataset = "resume.getBasicInfo";
      const model = await getTrainedModel(dataset);
      //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

      try {
        const promptRec = await Prompt.findOne({
          type: "resume",
          name: "oneLineSlogan",
          active: true,
        });
        let prompt = promptRec.value;
        prompt = await prompt.replaceAll("{{PersonName}}", personName);

        const inputPrompt = `This is the Resume data (IN JSON): ${JSON.stringify(
          userData
        )}
      
      Please find the following details in above provided userdata:
      shortName, jobTitle, linkedIn
      the shortName means two letters from Name of the person.
      ${prompt}

      the linkedIn means the LinkedInUrl of the person.

      The output must be in this format. (following is an example)
      {
        "shortName": "AB",
        "jobTitle": "Software Engineer",
        "contact": {
          "linkedIn": "https://www.linkedin.com/in/abc/"
        }
      }


      The output must be a valid JSON
      Do not add anything if there is no value for a field. if there is no value leave that field blank donot add any extra labesls.

      `;
        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          // stream: true,
          messages: [{ role: "user", content: inputPrompt }],
        });

        //update total user credits
        await updateUserTotalCredits(session?.user?.email, creditsUsed)

        // make a trainBot entry
        try {
          if (trainBotData) {


            const basicInfoId = makeid();

            const payload = {
              id: basicInfoId,
              primarySkillsText: response?.choices[0]?.message?.content?.replace(
                /(\r\n|\n|\r)/gm,
                ""
              ),
            };

            const obj = {
              entryId: basicInfoId,

              type: "resume.getBasicInfo",
              input: inputPrompt,
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
        } catch (error) { }

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
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }

    if (type === "summary") {
      const dataset = "resume.writeSummary";
      const model = await getTrainedModel(dataset);
      //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

      try {
        await startDB();
        const promptRec = await Prompt.findOne({
          type: "resume",
          name: "summary",
          active: true,
        });
        const prompt = promptRec.value;
        console.log(jobPosition);

        let promptSummary = await prompt.replaceAll("{{jobPosition}}", jobPosition);
        promptSummary = await promptSummary.replaceAll("{{PersonName}}", personName);
        const inputPrompt = `Read ${personName}'s Resume data: ${JSON.stringify(userData)}
      
      and then:
              ${promptSummary}`;


        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: [{ role: "user", content: inputPrompt }],
        });

        // make a trainBot entry

        const stream = OpenAIStream(response, {
          onStart: async () => {
            await updateUserTotalCredits(session?.user?.email, creditsUsed)
          },
          onFinal: async (completions) => {
            try {
              if (trainBotData) {
                await startDB();
                const summaryId = makeid();

                const payload = {
                  id: summaryId,
                  summaryText: completions,
                };

                // postConsultingBid(payload);

                let entry: TrainBotEntryType = {
                  entryId: summaryId,
                  type: "resume.writeSummary",
                  input: inputPrompt,
                  output: completions,
                  idealOutput: "",
                  status: "pending",
                  userEmail: trainBotData.userEmail,
                  fileAddress: trainBotData?.fileAddress,
                  Instructions: `Write Summary for the resume`,
                };
                makeTrainedBotEntry(entry);
              }
            } catch {
              console.log("error while saving summary....");
            }
          },
        });

        // Respond with the stream
        return new StreamingTextResponse(stream);
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }

    if (type === "primarySkills") {
      const dataset = "resume.writePrimarySkills";
      const model = await getTrainedModel(dataset);
      //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

      try {
        await startDB();

        const promptRec = await Prompt.findOne({
          type: "resume",
          name: "primarySkills",
          active: true,
        });
        const promptDB = promptRec.value;

        const promptRefined = await promptDB.replaceAll(
          "{{jobPosition}}",
          jobPosition
        );

        const inputPrompt = `Read ${personName}'s Resume data:: ${JSON.stringify(
          userData
        )}
      
    
      and then:
      ${promptRefined}
      
      the answer must be in a valid JSON array
      `;

        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          // stream: true,
          messages: [{ role: "user", content: inputPrompt }],
        });


        //update total records of user
        await updateUserTotalCredits(session?.user?.email, creditsUsed)

        // make a trainBot entry

        try {
          if (trainBotData) {
            await startDB();
            await startDB();
            const primarySkillsId = makeid();

            const payload = {
              id: primarySkillsId,
              primarySkillsText: response?.choices[0]?.message?.content?.replace(
                /(\r\n|\n|\r)/gm,
                ""
              ),
            };

            const obj = {
              entryId: primarySkillsId,
              type: "resume.writePrimarySkills",
              input: inputPrompt,
              output: response?.choices[0]?.message?.content?.replace(
                /(\r\n|\n|\r)/gm,
                ""
              ),
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Write Primary Skills for Resume`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) { }

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
      } catch (error) {
        return NextResponse.json(
          { result: error, success: false },
          { status: 404 }
        );
      }
    }


  }
}
