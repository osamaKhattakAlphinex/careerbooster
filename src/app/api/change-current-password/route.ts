import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();

  try {
    await startDB();

    const { userEmail, currentPassword, newPassword } = body;

    const user = await User.findOne({ email: userEmail });
    if (user) {
      const passwordMatch = await user.comparePassword(currentPassword);
      if (passwordMatch) {
        user.password = newPassword;
        await user.save();
        return NextResponse.json({ success: true }, { status: 200 });
      }
    } else {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
