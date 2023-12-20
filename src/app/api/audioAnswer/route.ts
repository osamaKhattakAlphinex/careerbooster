import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream } from "ai";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAudioVoice = async (speechText: any) => {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: speechText,
  });

  const mp3Buffer = await mp3.arrayBuffer();
  const buffer = Buffer.from(mp3Buffer);
  return buffer;
};
export async function POST(req: any) {
  try {
    const body = await req.json();
    const input = body.input;
    let results;
    const inputPrompt = `
      
                this is the user query regarding our platform:
                ${input}
                `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    const textResponse = await getAudioVoice(response);
    const audioResponse = NextResponse.json(textResponse);
    audioResponse.headers.set("Content-Type", "audio/mpeg");
    return audioResponse;
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { success: true, message: "SOMETHING WENT WRONG" },
      { status: 500 }
    );
  }

  //    return new StreamingTextResponse(stream);
}
