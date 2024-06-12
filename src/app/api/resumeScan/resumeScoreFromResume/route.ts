import TrainBot from "@/db/schemas/TrainBot";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const assistant_id = process.env.OPENAI_RESUME_ASSISTANT || "";

export async function POST(req: NextRequest) {
  // try {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const _file = await toFile(file, "my-attachment-file");
  const fileUpload = await openai.files.create({
    file: _file,
    purpose: "assistants",
  });
  
  const thread = await openai.beta.threads.create({
    body: {
      messages: [
        {
          role: "user",
          content: `Analyze the Resume attached You have to return json which will be like this
          {
            keywords:<Array of strings (Keywords that you find in resume)>
            problems: <Array of strings(Formatting Issues, writing clarity, shortcomings etc.)>
          }`,
          // Attach the new file to the message.
          file_ids:[fileUpload.id],
        },
      ],
    },
  });

  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant_id,
    instructions: "Please address the user.",
  });

  while (run.status === "queued" || run.status == "in_progress") {
    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  const id = messages.data[0].id;
  const role = messages.data[0].role;
  const latest_message = messages.data[0].content[0];
  let responseMessage;
  if (latest_message.type === "text") {
    responseMessage = {
      id: id,
      role: role,
      content: latest_message.text.value,
    }; // Accessing the text value if it's a text message
    console.log(responseMessage.content);
  } else {
    console.log("Unknown message type"); // Handling other types of messages
  }
  return;

  const { resume_content, potentialSkills } = await req.json();
  const inputPrompt = `
    
        Here are the top keywords: 
        ${potentialSkills}

        Here is the resume content:
        ${resume_content}

        On scale of 1-100 how much the resume content is scored against the top keywords.
        Also give potential problems that exist in the content
         
        Give answer in json like 
        {
            score: <YOUR NUMBER VALUE>
            problems: [Array of Strings]
        }
          `;

  const response = await openai.chat.completions.create({
    model: "ft:gpt-3.5-turbo-1106:careerbooster-ai::8Icp5xpE",
    messages: [{ role: "user", content: inputPrompt }],
  });

  try {
    await startDB();

    const obj = {
      type: "resumeScan.job.getResumeScore",
      input: inputPrompt,
      output: response?.choices[0]?.message?.content?.replace(
        /(\r\n|\n|\r)/gm,
        ""
      ),
      idealOutput: "",
      status: "pending",
      Instructions: `Get Resume Score and Potential Problems in Resume against a specific job description`,
    };

    await TrainBot.create({ ...obj });
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
  //     { result: "Something went wrong", success: false },
  //     { status: 404 }
  //   );
  // }
}
