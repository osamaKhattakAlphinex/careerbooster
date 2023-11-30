import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import FineTuningSetting from "@/db/schemas/FineTuningSetting";
import TrainedModel from "@/db/schemas/TrainedModel";

export const GET = async (
  req: any,
  { params }: { params: { dataset: string } }
) => {
  try {
    let model: string | null = null;
    await startDB();

    // Getting the dataset model if trained previously
    const datasetModel: any = await TrainedModel.findOne({
      dataset: params.dataset,
    });

    model = datasetModel ? datasetModel.model : null;

    // getting default model if trained model no found
    if (!model) {
      const defaultModel: any = await FineTuningSetting.findOne({});
      model = defaultModel ? defaultModel.tuningBaseModel : null;
    }

    return NextResponse.json({
      success: true,
      model,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};
