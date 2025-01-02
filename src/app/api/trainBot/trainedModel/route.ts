
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainedModel from "@/db/schemas/TrainedModel";

export const GET = async () => {
  try {
    await startDB();
    const trainedModels = await TrainedModel.find({});

    return NextResponse.json({
      success: true,
      result: trainedModels,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      result: [],
      totalRecords: "no records found",
    });
  }
};
