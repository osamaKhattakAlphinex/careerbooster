import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
export async function POST(req: any) {
  const body = await req.json();
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
    // console.log(mp3);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    // console.log(buffer);
    // console.log(Buffer.isEncoding("utf8"));
    // console.log(buffer);
    // const requestHeaders = new Headers(req.headers);
    //     // await fs.writeFile(speechFile, buffer);
    //     const response = NextResponse.next({
    //       request: {
    //         // New request headers
    //         headers: requestHeaders,
    //       },
    //     });

    //     // Set a new response header x-hello-from-middleware2
    //     response.headers.set("Content-Type", "audio/mp3");
    //     return response;
    return NextResponse.json(
      {
        success: true,
        result: buffer,
        // mp3,
        message: "Speech file created successfully",
      },
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
