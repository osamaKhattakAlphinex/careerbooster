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

    // cancel the job
    await openai.fineTuning.jobs.cancel(jobId);

    // reset the status and jobId to normal
    const fineTuneModel = await FineTuneModel.findOneAndUpdate(
      {
        fineTuningJobId: jobId,
      },
      { status: status, fineTuningJobId: "N/A" },
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
