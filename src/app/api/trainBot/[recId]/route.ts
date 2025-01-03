import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (
  req: NextRequest,
  { params }: { params: { recId: string } }
) => {
  try {
    await startDB();

    const rec = await TrainBot.findById(params.recId);

    return NextResponse.json({
      success: true,
      data: rec,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err,
    });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { recId: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const { recId } = params;
    const request = await req.json();
    const { idealOutput, status } = request;

    await startDB();
    const trainBot = await TrainBot.findOneAndUpdate(
      { _id: recId },
      { idealOutput: idealOutput, status: status },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      data: trainBot,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { recId: string } }
) => {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    const { recId } = params;

    await startDB();
    const trainBot = await TrainBot.deleteOne({ _id: recId });
    return NextResponse.json({
      success: true,
      data: trainBot,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      result: "User not found",
    });
  }
};
