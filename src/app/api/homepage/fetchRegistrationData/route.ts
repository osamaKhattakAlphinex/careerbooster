import { NextResponse } from "next/server";
import OpenAI from "openai";
import TrainBot from "@/db/schemas/TrainBot";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const body = await req.json();

    if (body) {
      const reqBody = body;
      const content = reqBody.content;
      const trainBotData = reqBody?.trainBotData;

      if (content) {
        // CREATING LLM MODAL
        // const model = new OpenAI({
        //   modelName: "gpt-3.5-turbo",
        //   temperature: 0.5,
        // });
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const input = `This is the User Data:
                ${content}
      
                Now please give me the following information about the user:
                First Name:
                Last Name:
                Email Address:
                Phone / Mobile Number:
                Country Name:
                Street Address:
                City or/and State Name:
                Postal Code from the provided data or get from the name of the City:
      
      
                The answer MUST be a valid JSON and formatting should be like this 
                replace the VALUE_HERE with the actual value
                {
                  firstName: VALUE_HERE,
                  lastName: VALUE_HERE,
                  email: VALUE_HERE,
                  phone: VALUE_HERE,
                  country: VALUE_HERE,
                  street: VALUE_HERE,
                  cityState: VALUE_HERE,
                  postalCode: VALUE_HERE,
                }
      
                If there is no value Leave that field blank`;

        // const resp = await model.call(input);
        const response = await openai.chat.completions.create({
          model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8IKUVjUg", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
        });

        try {
          if (trainBotData) {
            // make a trainBot entry
            const obj = {
              type: "register.wizard.basicInfo",
              input: input,
              output: response.choices[0].message.content,
              idealOutput: "",
              status: "pending",
              userEmail: trainBotData.userEmail,
              fileAddress: trainBotData.fileAddress,
              Instructions: `Fetching basic information e.g. Name, email, phone, address, etc.`,
            };

            await TrainBot.create({ ...obj });
          }
        } catch (error) {}

        return NextResponse.json(
          { data: response.choices[0].message.content, success: true },
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
