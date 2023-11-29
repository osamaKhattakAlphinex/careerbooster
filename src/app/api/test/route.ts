import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

export async function POST(request: any) {
  const body = await request.json();
  console.log(body);
  const { input } = body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const speechFile = path.resolve("./public/speech.mp3");

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: input,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.writeFile(speechFile, buffer);

    return NextResponse.json(
      { success: true, buffer, message: "Speech file created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { success: true, message: "SOMETHING WENT WRONG" },
      { status: 500 }
    );
  }
}
