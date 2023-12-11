import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const body = await req.json();
  const email = body.email;
  const messageData = body.chatData.slice(1);
  console.log(email, messageData);

  const assistant = await openai.beta.assistants.create({
    name: "AI Chat Bot",
    instructions:
      "You are an AI Carrer Coach which helps in assisting user on basis of his/her resume data",
    model: "gpt-4-1106-preview",
  });
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Hi",
  });
  console.log(message);
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Please address the user.",
  });
  const runFor = await openai.beta.threads.runs.submitToolOutputs(
    thread.id,
    run.id,
    {
      tool_outputs: [
        {
          tool_call_id: "call_abc123",
          output: "28C",
        },
      ],
    }
  );
  const messages = await openai.beta.threads.messages.list(thread.id);
  console.log(messages.data);
  return NextResponse.json(
    { result: "Chat Saved", success: true },
    { status: 200 }
  );
}
