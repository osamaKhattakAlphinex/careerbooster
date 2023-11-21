import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export const GET = async (req: any) => {
  const url = new URL(req.url);

  const status = url.searchParams.get("status");
  const type = url.searchParams.get("type");
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const skip = (page - 1) * limit;

  try {
    await startDB();

    const filter = { status: status, type: type };
    console.log(limit);
    const recs = await TrainBot.find(filter).limit(limit).skip(skip);

    const total = await TrainBot.count(filter); // Count based on filter conditions
    return NextResponse.json({
      success: true,
      data: recs,
      totalRecs: total,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      data: [],
      totalRecords: "no records found",
    });
  }
};
