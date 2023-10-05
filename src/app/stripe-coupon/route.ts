// app/checkout-sessions/route.ts
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export interface CouponBody {
  coupon: string;
}

// get coupon
export async function POST(req: Request) {
  const body = (await req.json()) as CouponBody;

  try {
    const coupon = await stripe.coupons.retrieve(body.coupon);
    return NextResponse.json(coupon);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}

// // create coupon
// export async function POST(req: Request) {
//   const body = (await req.json()) as CouponBody;

//   try {
//     const coupon = await stripe.coupons.create({
//       percent_off: 25.5,
//       duration: "repeating",
//       duration_in_months: 3,
//     });
//     return NextResponse.json(coupon);
//   } catch (error) {
//     if (error instanceof Stripe.errors.StripeError) {
//       const { message } = error;
//       return NextResponse.json({ message }, { status: error.statusCode });
//     }
//   }
// }