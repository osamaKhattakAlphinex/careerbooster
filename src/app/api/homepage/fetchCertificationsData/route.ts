import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { getTrainedModel } from "@/helpers/getTrainedModel";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}
export async function POST(req: any) {
  try {
    const reqBody = await req.json();
    if (reqBody) {
      const content = removeSpecialChars(reqBody.content.substring(0, 13000));
      const trainBotData = reqBody.trainBotData;

      if (content) {
        // CREATING LLM MODAL
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const dataset = "register.wizard.listCertifications";
        const model = await getTrainedModel(dataset);
        //console.log(`Trained Model(${model}) for Dataset(${dataset})`);

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me a List of All Certifications found from the above user data provided.
    
              The answer MUST be a valid JSON and formatting should be like this 
              replace the VALUE_HERE with the actual values
              {
                certifications: [
                  {
                    title: VALUE_HERE,
                    issuingOrganization: VALUE_HERE,
                    date: VALUE_HERE,
                  },
                  .
                  .
                  .
                ]
              }
              If you don't see any certifications just resturn empty like
              {
                certifications: []
              }
              If there is no value Leave that field blank
          `;

        // const resp = await model.call(input);
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
        });
        try {
          // make a trainBot entry
          if (trainBotData) {
            await startDB();
            const obj = {
              type: "register.wizard.listCertifications",
              input: input,
              output: response?.choices[0]?.message?.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData?.userEmail,
              fileAddress: trainBotData?.fileAddress,
              Instructions: `Get List of all Certifications`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) { }

        return NextResponse.json(
          { success: true, result: response.choices[0].message.content },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
