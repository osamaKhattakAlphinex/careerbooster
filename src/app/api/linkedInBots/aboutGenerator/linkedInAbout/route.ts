import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function postAbouts(payload: any) {
  await startDB();
  const user = await User.findOne({ email: payload.userEmail });
  if (!user) {
    return NextResponse.json({ result: "", success: false }, { status: 404 });
  } else if (!user.linkedInAbouts || user.linkedInAbouts.length === 0) {
    user.linkedInAbouts = [payload];
  } else {
    user.linkedInAbouts.push(payload);
  }
  const response = await user.save();
  return response;
}

export async function POST(request: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await startDB();
      const payload = await request.json();

      const response = await postAbouts(payload);

      return NextResponse.json(
        { result: response, success: true },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { result: "Internal Server Error", success: false },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}