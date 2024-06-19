import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export const POST = async (req: NextRequest) => {
  const { ids } = await req.json();

  try {
    await startDB();

    const recs = await TrainBot.find({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      reviewedData: recs,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
};
