import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);

  const status = url.searchParams.get("status");
  const type = url.searchParams.get("type");
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const skip = (page - 1) * limit;

  try {
    await startDB();

    const filter = { status: status, type: type };
    const recs = await TrainBot.find(filter).sort({ createdAt: -1 }).limit(limit).skip(skip);

    const total = await TrainBot.count(filter); // Count based on filter conditions
    return NextResponse.json({
      success: true,
      result: recs,
      totalRecs: total,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      result: [],
      totalRecords: "no records found",
    });
  }
};
