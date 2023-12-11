import startDB from "@/lib/db";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Coupon from "@/db/schemas/Coupon";
import { loadStripe } from "@stripe/stripe-js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe: any = await loadStripe(STRIPE_PK);)
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

    console.log(payload);

    const coupon = await stripe.coupons.create({
      ...payload,
    });

    // const response = await Coupon.create({ ...payload });
    return NextResponse.json(
      { result: coupon, success: true },
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
    const coupons = await stripe.coupons.list();
    // await startDB();
    // const coupons = await Coupon.find();
    return NextResponse.json(
      { success: true, result: coupons.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
