import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  // const { messages } = await req.json();
  const assistant = await openai.beta.assistants.create({
    name: "AI Chat Bot",
    instructions:
      "You are a personal AI coach. You get some initial data abour user to answer his/her questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo",
  });
  const thread = await openai.beta.threads.create();
  console.log(thread.id);
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Hi",
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Please address the user.",
  });
  const messages = await openai.beta.threads.messages.list(thread.id);
  console.log(messages.data);
  return;
  // Ask OpenAI for a streaming chat completion given the prompt
  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   stream: true,
  //   messages,
  // });

  // // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);
  // // Respond with the stream
  // return new StreamingTextResponse(stream);
}
