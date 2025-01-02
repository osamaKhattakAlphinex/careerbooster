import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, email } = await req.json();
  // Ask OpenAI for a streaming chat completion given the prompt
  // console.log(messages[messages.length - 1]);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // if (response) {
  //   await startDB();
  //   const user = await User.findOne({ email: email });
  //   let assistantId = user?.chatThreads?.assistantId;
  //   console.log(assistantId);
  //   let threadId = user?.chatThreads?.threads[0];
  //   console.log(threadId);
  //   if (!assistantId) {
  //     console.log("inside a id");
  //     const assistant = await openai.beta.assistants.create({
  //       name: "AI Career Coach Chat Bot",
  //       instructions:
  //         "You are an AI Carrer Coach which helps in assisting user on basis of his/her resume data",
  //       model: "gpt-3.5-turbo",
  //     });
  //     assistantId = assistant.id;
  //     const newChatThread = {
  //       assistantId: assistant.id,
  //       threads: [],
  //       // Add any other necessary properties for your chat thread
  //     };
  //     await User.findOneAndUpdate(
  //       { email: email },
  //       { $set: { chatThreads: newChatThread } },
  //       { new: true }
  //     );
  //   }

  //   if (!threadId) {
  //     console.log("inside t id");

  //     const thread = await openai.beta.threads.create();
  //     threadId = thread.id;
  //     await User.findOneAndUpdate(
  //       { email: email },
  //       { $push: { "chatThreads.threads": thread.id } },
  //       { new: true }
  //     );
  //   }
  //   // await openai.beta.threads.messages.create(threadId, {
  //   //   role: "user",
  //   //   content: messages[messages.length - 1],
  //   // });
  // }

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
