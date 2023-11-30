import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import Payment from "@/db/schemas/Payment";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "inspector";

export async function POST(req: any) {
  try {
    const body = await req.json();

    if (req.method === "POST") {
      try {
        await startDB();

        const { userEmail, amountPaid, PackageId } = body.data;

        const payment = new Payment({
          userEmail,
          amountPaid,
          PackageId,
        });

        await payment.save();

        return NextResponse.json(
          { result: payment, success: true },
          { status: 201 }
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
        { result: "Method Not Allowed", success: false },
        { status: 405 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}

export async function GET(req: any) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      await startDB();
      const payments = await Payment.find({});
      return NextResponse.json(
        { payments: payments, success: true },
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
