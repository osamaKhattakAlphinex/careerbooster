import Job from "@/db/schemas/Job";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: any, content: any) {
  try {
    await startDB();
    console.log(content);
    const job = await Job.find();
    return NextResponse.json({ success: true, job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
