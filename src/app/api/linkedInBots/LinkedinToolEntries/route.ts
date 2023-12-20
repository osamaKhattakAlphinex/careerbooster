import { NextApiHandler } from "next";
import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from "path";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const { linkedinFileName } = body;
      const linkedinContent = body.linkedinContent.substring(0, 12000);
      // For Registration if file is uploaded then load content from that fiel
      if (linkedinFileName) {
        // load file
        // const dir = path.join(
        //   process.cwd() + "/public",
        //   "/files",
        //   `/linkedin-temp`
        // );
        // const loader = new PDFLoader(`${dir}/${fileName}`);
        // const docs = await loader.load();

        // let contentTxt = docs.map((doc: any) => doc.pageContent);
        // const content = contentTxt.join(" ");
        // CREATING LLM MODAL
        const model = new OpenAI({
          modelName: "gpt-3.5-turbo",
          temperature: 0.5,
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

        try {
          await startDB();

          const resp = await model.call(input);
          const {
            fullName,
            firstName,
            lastName,
            email,
            phone,
            location,
            recentJob,
          } = JSON.parse(resp);

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

          // const resp = await chain4.call({ query: input });
          // const respString = JSON.stringify(resp);

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
