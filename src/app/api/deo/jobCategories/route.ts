import JobCategory from "@/db/schemas/JobCategory";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";
export async function GET() {
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