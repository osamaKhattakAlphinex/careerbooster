import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

export const PUT = async (
  req: any,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    const request = await req.json();
    const { status } = request;

    await startDB();
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { status: status },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
};
