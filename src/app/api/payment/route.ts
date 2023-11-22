import mongoose from "mongoose";
const { Schema } = mongoose;
import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import Payment from "@/db/schemas/Payment";

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
