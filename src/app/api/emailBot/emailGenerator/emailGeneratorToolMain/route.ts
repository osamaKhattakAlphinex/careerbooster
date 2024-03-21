import OpenAI from "openai";
import Prompt from "@/db/schemas/Prompt";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getTrainedModel } from "@/helpers/getTrainedModel";

// This function can run for a maximum of 5 seconds
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getPromptName = (generationType: string) => {
  if (generationType === "email") {
    return "emailWriter";
  }
  if (generationType === "firstFollowUp") {
    return "emailWriterFirstFollowUp";
  }
  if (generationType === "secondFollowUp") {
    return "emailWriterSecondFollowUp";
  }
};

const replacePromptData = (
  generationType: string,
  promptDB: any,
  args: any
) => {
  const { jobDescription, emailText, firstFollowUpText } = args;
  if (generationType === "email") {
    return promptDB.replaceAll("{{jobDescription}}", jobDescription);
  } else if (generationType === "firstFollowUp") {
    return promptDB.replaceAll("{{emailText}}", emailText);
  } else if (generationType === "secondFollowUp") {
    promptDB = promptDB.replaceAll("{{emailText}}", emailText);
    promptDB = promptDB.replaceAll(
      "{{firstFollowUpEmailText}}",
      firstFollowUpText
    );
    return promptDB;
  }
};

export async function POST(req: any) {
  try {
    const body = await req.json();

    let {
      generationType,
      jobDescription,
      emailText,
      firstFollowUpText,
      content,
    } = body;

    if (body) {
      content = content.substring(0, 10000);

      let dataset: string = "";

      if (generationType === "email") {
        dataset = "email.followupSequence";
      }
      if (generationType === "firstFollowUp") {
        dataset = "email.firstFollowUpSequence";
      }
      if (generationType === "secondFollowUp") {
        dataset = "email.secondFollowUpSequence";
      }

      const model: any = await getTrainedModel(dataset);

      await startDB();

      const promptRec = await Prompt.findOne({
        type: "email",
        name: getPromptName(generationType),
        active: true,
      });

      let promptDB = promptRec ? promptRec.value : "";

      const prompt = await replacePromptData(generationType, promptDB, {
        jobDescription,
        emailText,
        firstFollowUpText,
      });

      if (content) {
        const inputPrompt = `${
          generationType === "email"
            ? `Following are the content of the resume (in JSON format): JSON user/resume data: ${content}`
            : ""
        } 
            ${prompt}
            `;

        const response: any = await openai.chat.completions.create({
          model: model ? model : "gpt-3.5-turbo",
          stream: true,
          messages: [{ role: "user", content: inputPrompt }],
        });

        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
