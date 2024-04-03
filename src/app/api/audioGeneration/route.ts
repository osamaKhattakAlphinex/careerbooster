import { NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import fs from "fs/promises";
export async function POST(req: any) {
  const body = await req.json();
  const { input } = body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // const speechFile = path.resolve("./public/speech.mp3");
  try {
    const mp3: any = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: input,
      // input:"And lastly we have keywords generator where you can generate top keywords  of recent work experiences for your linkedin. "
    });

    //  const buffer = Buffer.from(await mp3.arrayBuffer());
    //     await fs.writeFile(speechFile, buffer);

    const mp3Buffer = await mp3.arrayBuffer();
    const buffer = Buffer.from(mp3Buffer);

    const response = NextResponse.json(buffer);
    response.headers.set("Content-Type", "audio/mpeg");
    return response;
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { success: false, message: "SOMETHING WENT WRONG" },
      { status: 500 }
    );
  }
}
