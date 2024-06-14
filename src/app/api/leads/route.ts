import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";

// Global variable or cache to store the totalRecords value
let cachedTotalRecords: number | null = null;

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.search);

  const startIndex = parseInt(queryParams.get("startIndex") || "0", 10);
  const endIndex = parseInt(queryParams.get("endIndex") || "0", 10);

  try {
    await startDB();

    // Check if the cached totalRecords value is available and up-to-date
    if (cachedTotalRecords === null) {
      // If the cache doesn't exist, fetch the totalRecords value
      cachedTotalRecords = await LinkedinToolEntrie.countDocuments({});
    }

    // Fetch the data as usual
    const filteredRecs = await LinkedinToolEntrie.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(endIndex - startIndex);

    return NextResponse.json({
      success: true,
      result: filteredRecs,
      totalRecords: cachedTotalRecords, // Use the cached totalRecords
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      result: [],
      totalRecords: 0,
    });
  }
};
