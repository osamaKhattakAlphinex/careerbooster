import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";

export const GET = async (req: any) => {
  const url = new URL(req.url);

  const status = url.searchParams.get("status");
  const type = url.searchParams.get("type");

  const dataType = url.searchParams.get("dataType");

  try {
    await startDB();

    const recs = await LinkedinToolEntrie.find({});

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
