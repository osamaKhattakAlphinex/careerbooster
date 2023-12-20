import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const content = body.content.substring(0, 12000);
      if (content) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const input = `
              This is the User Data:
              ${content}
    
              Now please give me the following information about the user:
              First Name:
              Last Name:
              Email Address:
    
    
              The answer MUST be a valid JSON and formatting should be like the following 
              replace the VALUE_HERE with the actual value
              {
                firstName: VALUE_HERE,
                lastName: VALUE_HERE,
                email: VALUE_HERE,
              }
    
              If there is no value Leave that field blank
          `;

        // const resp = await model.call(input);
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // v2
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 1,
          max_tokens: 456,
        });

        return NextResponse.json(
          { success: true, result: response.choices[0].message.content },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
