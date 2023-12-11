import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import FineTuneModel from "@/db/schemas/FineTuningModel";
import TrainedModel from "@/db/schemas/TrainedModel";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";

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

export const DELETE = async (
  req: any,
  { params }: { params: { fileId: string } }
) => {
  try {
    const response = await openai.files.del(params.fileId);

    if (response.deleted) {
      await FineTuneModel.deleteOne({ fileId: params.fileId });
    }
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

export const POST = async (
  req: any,
  { params }: { params: { fileId: string } }
) => {
  try {
    const { fileId } = params;
    const request = await req.json();
    const { status, dataset } = request;

    await startDB();

    let trainedModels = await TrainedModel.findOne({ dataset });

    if (!trainedModels) {
      const settings = await FineTuningSetting.findOne({});

      var query = { dataset: dataset, model: settings.tuningBaseModel };
      await TrainedModel.create(query);
      trainedModels = await TrainedModel.findOne({ dataset });
    }

    const fineTune = await openai.fineTuning.jobs.create({
      training_file: fileId,
      model: trainedModels.model, // here the stored gpt-model or finetuned model will be used
      hyperparameters: { n_epochs: 2 },
    });

    const fineTuneModel = await FineTuneModel.findOneAndUpdate(
      { fileId: fileId },
      {
        status: status,
        fineTuningJobId: fineTune.id,
        // fineTuningJobId: "testing",
        tuningBaseModel: trainedModels.model,
      },
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
