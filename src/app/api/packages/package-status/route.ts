import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    await startDB();
    const url = new URL(request.url);
    const email = url?.searchParams.get("email");
    if (email) {
      const packages = await User.find({ email });
      const packageStatus = packages[0].userPackage ? true : false;
      if (!packageStatus) {
        return NextResponse.json(
          { success: false, result: "package Not Found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, result: packageStatus },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, result: "email is not present in query" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
