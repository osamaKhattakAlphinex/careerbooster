import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TrainBot from "@/db/schemas/TrainBot";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function postJobDescriptions(payload: any) {
  await startDB();
  const user = await User.findOne({ email: payload.userEmail });
  if (!user) {
    return NextResponse.json({ result: "", success: false }, { status: 404 });
  } else if (
    !user.linkedInJobDescriptions ||
    user.linkedInJobDescriptions.length === 0
  ) {
    user.linkedInJobDescriptions = [payload];
  } else {
    user.linkedInJobDescriptions.push(payload);
  }
  const response = await user.save();
  return response;
}
async function updateJobDescriptions(payload: any) {
  await startDB();
  await User.findOneAndUpdate(
    { email: payload.email, "linkedInJobDescriptions.id": payload.id },
    {
      $set: {
        "linkedInJobDescriptions.$.jobDescriptionText": payload.text,
      },
    },
    { new: true }
  );

  return "ok";
}
export async function POST(request: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await startDB();
      const payload = await request.json();
      const response = await updateJobDescriptions(payload);

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
