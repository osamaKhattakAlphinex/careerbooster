import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (
  req: NextRequest,
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
    await FineTuneModel.findOneAndUpdate(
      {
        fineTuningJobId: jobId,
      },
      { status: status, fineTuningJobId: "N/A", tuningBaseModel: "N/A" },
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
