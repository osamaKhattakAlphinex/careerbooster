// import { StreamingTextResponse, CohereStream } from "ai";

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";
// export async function POST(req: Request) {
//   // Extract the `prompt` from the body of the request
//   const { prompt } = await req.json();

//   const body = JSON.stringify({
//     prompt,
//     model: "command-nightly",
//     max_tokens: 300,
//     stop_sequences: [],
//     temperature: 0.9,
//     return_likelihoods: "NONE",
//     stream: true,
//   });
//   console.log(body);
//   console.log(process.env.COHERE_API_KEY);
//   const response = await fetch("https://api.cohere.ai/v1/generate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
//     },
//     body,
//   });
//   console.log(response);
//   return;
//   // Extract the text response from the Cohere stream
//   const stream = CohereStream(response);

//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

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
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
