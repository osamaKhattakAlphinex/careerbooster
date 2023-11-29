import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = async (
  req: any,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { jobId } = params;
    // const request = await req.json();
    // const { status } = request;

    await startDB();

    console.log(jobId);

    let fineTune = await openai.fineTuning.jobs.retrieve(jobId);

    if (fineTune.status === "succeeded") {
      const fineTuneModel = await FineTuneModel.findOneAndUpdate(
        {
          fineTuningJobId: jobId,
        },
        { status: fineTune.status, fineTunedModel: fineTune.fine_tuned_model },
        { new: true }
      );
    }
    console.log(fineTune);

    return NextResponse.json({
      success: true,
      content: fineTune,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
