import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    await startDB();
    const exist = await LinkedinToolEntrie.findOne({ _id: id });
    if (exist) {
      await LinkedinToolEntrie.updateOne(
        { _id: id },
        { $set: { sendToCRM: true } }
      );
      return NextResponse.json(
        { result: "User updated", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { result: `${id} id not exists`, success: true },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
