import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";
import TrainedModel from "@/db/schemas/TrainedModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = async (req: any) => {
  try {
    await startDB();

    let jobs = await openai.fineTuning.jobs.list();

    // if (fineTune.status === "succeeded") {
    //   const fineTuneModel = await FineTuneModel.findOneAndUpdate(
    //     {
    //       fineTuningJobId: jobId,
    //     },
    //     { status: fineTune.status, fineTunedModel: fineTune.fine_tuned_model },
    //     { new: true }
    //   );

    //   var query = { dataset: fineTuneModel.datasetType },
    //     update = { dataset: fineTune.fine_tuned_model },
    //     options = { upsert: true, new: true, setDefaultsOnInsert: true };
    //   await TrainedModel.findOneAndUpdate(query, update, options);
    // }

    return NextResponse.json({
      success: true,
      jobs: jobs.data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
