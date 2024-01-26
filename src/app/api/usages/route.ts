import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import Usage from "@/db/schemas/ToolUsage";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: any) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      await startDB();
      const usages = await Usage.find({});
      console.log(usages);
      return NextResponse.json(
        { usages: usages, success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { result: "Server Error", success: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}
