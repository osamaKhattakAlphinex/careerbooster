import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req: any) {
  try {
    // const _body = req.json();

    const url = new URL(req.url);

    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          result: "Bad Request",
          success: false,
          error: "No email found",
        },
        { status: 400 }
      );
    }

    await startDB();

    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          error: "No User Found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          user,
          success: true,
        },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
