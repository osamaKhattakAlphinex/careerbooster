import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
const ObjectId = require("mongodb").ObjectId;

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
    const userPackage = await new ObjectId(request?.userPackage);
    const userPackageExpirationDate =
      request?.userPackage === "65144fcc17dd55f9a2e3ff6e"
        ? Date.now() + 365 * 24 * 60 * 60 * 1000
        : Date.now() + 30 * 24 * 60 * 60 * 1000;
    const userPackageUsed = request?.userPackageUsed;
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
        {
          userPackageExpirationDate: userPackageExpirationDate,
          userPackage: userPackage,
          userPackageUsed: userPackageUsed,
        },
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
