import Job from "@/db/schemas/Job";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    await startDB();
    const url = new URL(req.url);
    const deoId: any = url.searchParams.get("deoId");
    const jobs = await Job.find({ addedByUserId: deoId});
    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
