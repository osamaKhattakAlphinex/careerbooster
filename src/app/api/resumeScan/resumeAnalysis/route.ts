import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const assistant_id = process.env.OPENAI_RESUME_ASSISTANT || "";

export async function POST(req: NextRequest) {
  try {
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
            content: `You are a helpful assistant that reads resume pdf file and give analysis. 

          "Imporant: always use the response tool to respond to the user. "
          "Never add any other text to the response."`,
            // Attach the new file to the message.
            file_ids: [fileUpload.id],
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
    let json = {};
    if (run.required_action) {
      const tool_call = run.required_action.submit_tool_outputs.tool_calls[0];
      const resp = tool_call.function.arguments;
      json = JSON.parse(resp);
    }

    return NextResponse.json(
      {
        result: json,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Something went wrong", success: false },
      { status: 404 }
    );
  }
}
