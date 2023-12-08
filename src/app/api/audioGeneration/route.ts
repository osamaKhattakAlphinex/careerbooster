import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: any) {
  const body = await req.json();
  const { input } = body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: input,
    });

    const mp3Buffer = await mp3.arrayBuffer();
    const buffer = Buffer.from(mp3Buffer);

    const response = NextResponse.json(buffer);
    response.headers.set("Content-Type", "audio/mpeg");
    return response;
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { success: true, message: "SOMETHING WENT WRONG" },
      { status: 500 }
    );
  }
}
