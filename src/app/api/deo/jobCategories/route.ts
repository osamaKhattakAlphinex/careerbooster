import JobCategory from "@/db/schemas/JobCategory";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      await startDB();
      const jobCategories = await JobCategory.find();
      return NextResponse.json({ success: true, data: jobCategories }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { result: "Internal Server Error", success: false },
        { status: 500 }
      );
    }
  }