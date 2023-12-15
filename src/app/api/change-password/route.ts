import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

export async function POST(req: any) {
  const body = await req.json();
  try {
    await startDB();

    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    user.password = password;
    await user.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
