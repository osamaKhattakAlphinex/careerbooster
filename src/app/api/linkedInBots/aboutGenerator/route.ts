import Prompt from "@/db/schemas/Prompt";
import TrainBot from "@/db/schemas/TrainBot";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { OpenAIStream, StreamingTextResponse } from "ai";
import startDB from "@/lib/db";
import OpenAI from "openai";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const reqBody = await req.json();
    const userData = reqBody?.userData;
    const trainBotData = reqBody?.trainBotData;
    await startDB();
    // fetch prompt from db
    const promptRec = await Prompt.findOne({
      type: "linkedin",
      name: "about",
      active: true,
    });
    const prompt = promptRec.value;

    const inputPrompt = `This is the User data: ${JSON.stringify(userData)}

          this is the prompt:
          ${prompt}
          `;

    const response: any = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: inputPrompt }],
    });
    // make a trainBot entry
    try {
      if (trainBotData) {
        await startDB();

        const obj = {
          type: "linkedin.genearteConsultingBid",
          input: prompt,
          output: response,
          idealOutput: "",
          status: "pending",
          userEmail: trainBotData.userEmail,
          fileAddress: trainBotData.fileAddress,
          Instructions: `Generate Linkedin About for ${trainBotData.userEmail}`,
        };

        await TrainBot.create({ ...obj });
      }
    } catch (error) {}
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
    // res.end();
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
