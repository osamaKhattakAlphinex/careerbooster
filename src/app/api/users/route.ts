import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  let userDetails = [];
  try {
    await startDB();

    userDetails = await User.find();
    return NextResponse.json({ result: userDetails, success: true });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}
