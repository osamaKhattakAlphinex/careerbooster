import startDB from "@/lib/db";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Coupon from "@/db/schemas/Coupon";
import { loadStripe } from "@stripe/stripe-js";
import { makeCoupanCode } from "@/helpers/makeid";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe: any = await loadStripe(STRIPE_PK);)
// import { stripe } from "@/lib/stripe";

async function saveCouponToDb(coupon: any) {
  await Coupon.create({ ...coupon });
}

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
    let payload = await request.json();
    let response = null;
    if (!payload) {
      return NextResponse.json(
        { result: "Bad Request", success: false },
        { status: 404 }
      );
    }

    if (payload.coupon_type === "reward") {
      // generate  a a coupan code for the reward

      // check if the code generated is valid
      payload.coupon_code = payload.name;

      response = await saveCouponToDb(payload);
    }
    if (payload.coupon_type === "stripe") {
      const { coupon_type, ...stripePayload } = payload;
      payload = stripePayload;

      const coupon = await stripe.coupons.create({
        ...payload,
      });

      payload = {
        coupon_type: "stripe",
        coupon_code: coupon.id,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
        duration: coupon.duration,
        duration_in_months: coupon.duration_in_months,
        livemode: coupon.livemode,
        name: coupon.name,
        percent_off: coupon.percent_off,
        times_redeemed: coupon.times_redeemed,
        valid: coupon.valid,
      };
      response = await saveCouponToDb(payload);
    }
    if (payload.coupon_type === "paypal") {
      return NextResponse.json(
        { result: "Paypal coupan are not implemented yet", success: false },
        { status: 404 }
      );
    }

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
    // const coupons = await stripe.coupons.list();
    await startDB();
    const coupons = await Coupon.find();
    return NextResponse.json(
      // { success: true, result: coupons.data },
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
