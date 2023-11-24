import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (
  req: any,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { jobId } = params;
    const request = await req.json();
    const { status } = request;

    await startDB();

    const fineTune = await openai.fineTuning.jobs.cancel(jobId);

    const fineTuneModel = await FineTuneModel.findOneAndUpdate(
      {
        fineTuningJobId: jobId,
      },
      { status: status, fineTuningJobId: "" },
      { new: true }
    );

    console.log(fineTune);

    return NextResponse.json({
      success: true,
      //   content,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
