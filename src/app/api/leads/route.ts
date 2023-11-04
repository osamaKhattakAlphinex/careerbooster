import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";

export const GET = async (req: any) => {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.search);

  const startIndex = parseInt(queryParams.get("startIndex") || "0", 10);
  const endIndex = parseInt(queryParams.get("endIndex") || "0", 10);
  try {
    await startDB();

    const totalRecords = await LinkedinToolEntrie.countDocuments({});
    const filteredRecs = await LinkedinToolEntrie.find({})
      .skip(startIndex)
      .limit(endIndex - startIndex);
    return NextResponse.json({
      success: true,
      data: filteredRecs,
      totalRecords: totalRecords,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      data: [],
      totalRecords: 0,
    });
  }
};
