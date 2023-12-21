import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/db/schemas/User";
import UserPackages from "@/db/schemas/UserPackage";

export async function GET(req: any) {
  const session = await getServerSession(authOptions);

  let billing: any = {};

  if (session) {
    try {
      await startDB();
      const user = await User.findOne({ email: session.user?.email }).select(
        "-password"
      );

      const userPackage = await UserPackages.findById({
        _id: user.userPackage,
      });

      billing.userPackageExpirationDate = user.userPackageExpirationDate;
      billing.email = user.email;
      billing.firstName = user.firstName;
      billing.lastName = user.lastName;
      billing.status = user.status;
      billing.package = userPackage;

      return NextResponse.json(
        { billingDetail: billing, success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { result: "Server Error", success: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}
