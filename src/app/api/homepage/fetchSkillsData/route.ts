import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";

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
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const content = removeSpecialChars(reqBody.content);
      const trainBotData = reqBody.trainBotData;

      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        // const parser = StructuredOutputParser.fromZodSchema(

        const input = `This is the User Data:
              ${content}
    
              Now please give me a List of all  Skills from the above content provided.
    
              The answer MUST be a valid Javascript JSON Array of Strings.`;

        // const resp = await model.call(input);

        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icr9I31", // v2
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
            const obj = {
              type: "register.wizard.listSkills",
              input: input,
              output: response.choices[0].message.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData.userEmail,
              fileAddress: trainBotData.fileAddress,
              Instructions: `Get List of all Skills`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) {}

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
