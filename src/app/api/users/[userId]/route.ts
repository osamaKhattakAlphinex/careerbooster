import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PUT = async (
  req: any,
  { params }: { params: { userId: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        results: "Not Authorised",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { userId } = params;
    const request = await req.json();
    const status = request?.status;
    const userPackageExpirationDate = request?.userPackageExpirationDate;
    await startDB();
    if (status !== undefined) {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { status: status },
        { new: true }
      );
      return NextResponse.json({
        success: true,
        result: user,
      });
    }

    if (userPackageExpirationDate !== undefined) {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { userPackageExpirationDate: userPackageExpirationDate },
        { new: true }
      );
      return NextResponse.json({
        success: true,
        result: user,
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
};

export const DELETE = async (
  req: any,
  { params }: { params: { userId: string } }
) => {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    const { userId } = params;

    await startDB();
    const deletedUser = await User.deleteOne({ _id: userId });
    return NextResponse.json({
      success: true,
      data: deletedUser,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      result: "User not found",
    });
  }
};
