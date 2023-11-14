import UserPackage from "@/db/schemas/UserPackage";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req: any) {
  try {
    const url = new URL(req.url);

    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Bad Request: No email found",
        },
        { status: 400 }
      );
    }

    await startDB();

    const userPackage = await UserPackage.findById(id);

    if (!userPackage) {
      return NextResponse.json(
        {
          error: "No User Package Found",
          success: false,
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          userPackage,
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
