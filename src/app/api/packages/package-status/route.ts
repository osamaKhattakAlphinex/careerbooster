import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    await startDB();
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const packages = await User.find({ email });
    const packageStatus = packages[0].userPackage ? true : false;
    return NextResponse.json(
      { success: true, result: packageStatus },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
