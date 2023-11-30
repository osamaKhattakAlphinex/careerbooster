import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainedModel from "@/db/schemas/TrainedModel";

export const GET = async (req: any) => {
  try {
    await startDB();
    const trainedModels = await TrainedModel.find({});
    return NextResponse.json({
      success: true,
      data: trainedModels,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      data: [],
      totalRecords: "no records found",
    });
  }
};
