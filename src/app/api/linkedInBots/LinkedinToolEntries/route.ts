import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const { linkedinFileName } = body;
      const linkedinContent = body.linkedinContent.substring(0, 12000);
      // For Registration if file is uploaded then load content from that fiel
      if (linkedinFileName) {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
       
        const input = `
          This is the User Data:
          ${linkedinContent}

          Now please give me the following information about the user:
          Full Name:
          First Name:
          Last Name:
          Email Address:
          Phone:
          Must Recent Job Title: 
          Location

          The answer MUST be a valid JSON and formatting should be like this 
          replace the VALUE_HERE with the actual value
          {
            fullName: VALUE_HERE,
            firstName: VALUE_HERE,
            lastName: VALUE_HERE,
            email: VALUE_HERE,
            phone : VALUE_HERE,
            recentJob: VALUE_HERE,
            location: VALUE_HERE,

          }

          If there is no value Leave that field blank
      `;
        const response: any = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.5,
        });

        try {
          await startDB();

          const {
            fullName,
            firstName,
            lastName,
            email,
            phone,
            location,
            recentJob,
          } = JSON.parse(response.choices[0].message.content);

          //Create user in DB

          const user = await LinkedinToolEntrie.create({
            fileName: linkedinFileName,
            fileContent: linkedinContent,
            name: fullName,
            email,
            phone,
            location,
            recentJob,
            status: "pending",
            sendToCRM: false,
          });

          return NextResponse.json(
            {
              success: true,
              userId: user._id,
              firstName,
              lastName,
              fullName,
              email,
              phone,
              location,
            },
            { status: 200 }
          );
        } catch (error) {
          return NextResponse.json(
            { result: error, success: false },
            { status: 400 }
          );
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
