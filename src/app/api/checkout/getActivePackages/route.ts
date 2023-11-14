import startDB from "@/lib/db";
import UserPackage from "@/db/schemas/UserPackage";
import { NextResponse } from "next/server";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req: any) {
  try {
    const status = req?.status ?? "active";
    if (!status) {
      return NextResponse.json(
        { result: "Bad Request", success: false },
        { status: 400 }
      );
    }

    await startDB();

    const packages = await UserPackage.find({ status });

    if (!packages) {
      return NextResponse.json(
        { result: "Packages not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { result: packages, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
