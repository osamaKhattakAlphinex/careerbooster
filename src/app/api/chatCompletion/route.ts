import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const body = await req.json();
  const email = body.email;
  const messageData = body.message;
  const userData = body.userData;
  await startDB();

  const user = await User.findOne({ email: email });
  let assistantId = user?.chatThreads?.assistantId;
  let threadId = user?.chatThreads?.threads[0];
  console.log(threadId);
  if (!assistantId) {
    console.log("inside");
    const assistant = await openai.beta.assistants.create({
      name: "AI Career Coach Chat Bot",
      instructions:
        "You are an AI Carrer Coach which helps in assisting user on basis of his/her resume data",
      model: "gpt-3.5-turbo",
    });
    assistantId = assistant.id;
    const newChatThread = {
      assistantId: assistant.id,
      threads: [],
      // Add any other necessary properties for your chat thread
    };
    await User.findOneAndUpdate(
      { email: email },
      { $set: { chatThreads: newChatThread } },
      { new: true }
    );
  }

  // if (user.chatThreads.threads.length > 0) {
  //   console.log("inside");
  // }
  // const assistant = await openai.beta.assistants.create({
  //   name: "AI Career Coach Chat Bot",
  //   instructions:
  //     "You are an AI Carrer Coach which helps in assisting user on basis of his/her resume data",
  //   model: "gpt-3.5-turbo",
  // });
  if (!threadId) {
    const thread = await openai.beta.threads.create();
    threadId = thread.id;
    await User.findOneAndUpdate(
      { email: email },
      { $push: { "chatThreads.threads": thread.id } },
      { new: true }
    );
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userData,
    });
  }

  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: messageData,
  });
  console.log(message);
  let run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: "Please address the user.",
  });

  while (run.status === "queued" || run.status == "in_progress") {
    run = await openai.beta.threads.runs.retrieve(threadId, run.id);
  }
  const messages = await openai.beta.threads.messages.list(threadId);

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
    console.log(responseMessage);
  } else {
    console.log("Unknown message type"); // Handling other types of messages
  }
  // const messagesArray = messages.data.map((message) => {
  //   const id = message.id;
  //   const role = message.role;
  //   let content = "";

  //   if (message.content.length > 0 && message.content[0].type === "text") {
  //     content = message.content[0].text.value;
  //   }

  //   return { id, role, content };
  // });

  // console.log(messagesArray.reverse());

  return NextResponse.json(
    { result: responseMessage, success: true },
    { status: 200 }
  );
}
