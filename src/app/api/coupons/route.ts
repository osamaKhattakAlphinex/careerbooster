import startDB from "@/lib/db";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Coupon from "@/db/schemas/Coupon";
import { loadStripe } from "@stripe/stripe-js";
import { stripe } from "@/lib/stripe";
// import { stripe } from "@/lib/stripe";
export async function POST(request: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    await startDB();
    const payload = await request.json();

    const response = await Coupon.create({ ...payload });
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
}

export async function GET(request: any) {
  try {
    await startDB();
    const coupons = await Coupon.find();
    return NextResponse.json(
      { success: true, result: coupons },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
