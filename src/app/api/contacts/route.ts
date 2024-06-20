import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import Contact from "@/db/schemas/Contact";

export async function GET() {
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
