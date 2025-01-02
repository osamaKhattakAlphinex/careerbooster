import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TrainBot from "@/db/schemas/TrainBot";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function postHeadlines(payload: any) {
  await startDB();
  const user = await User.findOne({ email: payload.userEmail });
  if (!user) {
    return NextResponse.json({ result: "", success: false }, { status: 404 });
  } else if (!user.linkedInHeadlines || user.linkedInHeadlines.length === 0) {
    user.linkedInHeadlines = [payload];
  } else {
    user.linkedInHeadlines.unshift(payload)
    // user.linkedInHeadlines.push(payload);
  }
  const response = await user.save();
  return response;
}

async function updateHeadlines(payload: any) {
  await startDB();
  await User.findOneAndUpdate(
    { email: payload.email, "linkedInHeadlines.id": payload.id },
    {
      $set: {
        "linkedInHeadlines.$.headlineText": payload.text,
      },
    },
    { new: true }
  );

  await TrainBot.findOneAndUpdate(
    { entryId: payload.id, type: "linkedin.headlines" },
    {
      $set: {
        output: payload.text,
      },
    },
    { new: true }
  );
  return "ok";
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await startDB();
      const payload = await request.json();
      const response = await updateHeadlines(payload);

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
