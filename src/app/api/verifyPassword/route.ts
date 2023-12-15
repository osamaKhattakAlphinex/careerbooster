import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();
  console.log(body);
  try {
    await startDB();

    const { userEmail, currentPassword } = body;
    console.log(userEmail, currentPassword);
    const user = await User.findOne({ userEmail });
    console.log(user);
    //  const passwordMatch = await user.comparePassword(password);
    // if (!user) {
    //   return NextResponse.json(
    //     { message: "User not found", success: false },
    //     { status: 404 }
    //   );
    // }
  } catch (error) {
    console.log(error);
  }
}
