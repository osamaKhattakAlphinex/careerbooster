import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";
import TrainedModel from "@/db/schemas/TrainedModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = async (
  req: NextRequest,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { jobId } = params;

    await startDB();

    let fineTune = await openai.fineTuning.jobs.retrieve(jobId);

    if (fineTune.status === "succeeded") {
      var query1 = { fineTuningJobId: jobId },
        update1 = {
          status: fineTune.status,
          fineTunedModel: fineTune.fine_tuned_model,
        },
        options1 = { new: true };

      const fineTuneModel = await FineTuneModel.findOneAndUpdate(
        query1,
        update1,
        options1
      );

      var query2 = { dataset: fineTuneModel.datasetType },
        update2 = {
          dataset: fineTuneModel.datasetType,
          model: fineTune.fine_tuned_model,
        },
        options2 = { upsert: true, new: true, setDefaultsOnInsert: true };

      await TrainedModel.findOneAndUpdate(query2, update2, options2);
    } else {
      await FineTuneModel.findOneAndUpdate(
        {
          fineTuningJobId: jobId,
        },
        { status: fineTune.status },
        { new: true }
      );
    }

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
