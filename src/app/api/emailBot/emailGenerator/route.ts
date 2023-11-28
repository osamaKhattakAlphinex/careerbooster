import Prompt from "@/db/schemas/Prompt";

import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// PROMPT
// Here is the Job description:
// {{jobDescription}}

// based on the provided data about user and job description write an amazing cover letter.

// The answer must be formatted and returned as HTML
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

  try {
    const reqBody = await req.json();
    const type = reqBody?.type;
    const userData = reqBody?.userData;
    const email = reqBody?.email;
    const file = reqBody?.file;
    const jobDescription = reqBody?.jobDescription;
    const trainBotData = reqBody?.trainBotData;

    // fetch prompt from db
    await startDB();
    const promptRec = await Prompt.findOne({
      type: "email",
      name: "emailWriter",
      active: true,
    });
    const promptDB = promptRec.value;

    const prompt = promptDB.replace("{{jobDescription}}", jobDescription);
    let fileContent;
    // CREATING LLM MODAL

    if (type === "file") {
      const user = await User.findOne({ email: email }, { files: 1 });
      if (user) {
        const getFile = user.files.find(
          (userFile: any) => userFile.fileName === file
        );
        fileContent = getFile.fileContent;
      }
      //   res.end();
    }
    // this will run for both TYPES aiResume and profile
    const inputPrompt = `Following are the content of the resume (in JSON format): 
          JSON user/resume data: ${type === "file" ? fileContent : userData}

          this is the prompt:
          ${prompt}
          `;

    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    // make a trainBot entry
    try {
      if (trainBotData) {
        await startDB();

        const obj = {
          type: "linkedin.genearteConsultingBid",
          input: prompt,
          output: response?.choices[0]?.message?.content?.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ),
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Generate Email for ${trainBotData.userEmail}`,
        };

        await TrainBot.create({ ...obj });
      }
    } catch (error) {}
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
    //   res.end();
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
