import User from "@/db/schemas/User";
import UserPackage from "@/db/schemas/UserPackage";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    await startDB();
    const url = new URL(request.url);
    const email = url?.searchParams.get("email");
    if (email && email.length > 0) {
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
      const packages = await UserPackage.find({ status: "active" }).sort({
        amount: 1,
      });
      return NextResponse.json(
        { success: true, result: packages },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
