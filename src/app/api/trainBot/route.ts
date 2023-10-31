import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export const GET = async (req: any) => {
  const url = new URL(req.url);

  const status = url.searchParams.get("status");
  const type = url.searchParams.get("type");

  try {
    await startDB();

    const recs = await TrainBot.find({ status: status, type: type });

    return NextResponse.json({
      success: true,
      data: recs,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }
};
