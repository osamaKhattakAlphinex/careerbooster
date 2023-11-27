import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = async (
  req: any,
  { params }: { params: { fileId: string } }
) => {
  try {
    const content = await openai.files.content(params.fileId);
    return NextResponse.json({
      success: true,
      content,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};

export const POST = async (
  req: any,
  { params }: { params: { fileId: string } }
) => {
  try {
    const { fileId } = params;
    const request = await req.json();
    const { status } = request;

    await startDB();

    const fineTune = await openai.fineTuning.jobs.create({
      training_file: fileId,
      model: "gpt-3.5-turbo-1106", // here the stored gpt-model or finetuned model will be used

      hyperparameters: { n_epochs: 2 },
    });

    const fineTuneModel = await FineTuneModel.findOneAndUpdate(
      { fileId: fileId },
      { status: status, fineTuningJobId: fineTune.id },
      { new: true }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
