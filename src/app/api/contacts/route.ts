import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Contact from "@/db/schemas/Contact";

export async function GET(request: any) {
  try {
    await startDB();
    const emails = await Contact.find();
    return NextResponse.json({ success: true, emails }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
