import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Coupon from "@/db/schemas/Coupon";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function PUT(
  req: any,
  { params }: { params: { couponId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  const couponId = params.couponId;
  const payload = await req.json();

  try {
    await startDB();

    let userPackage = await Coupon.findOneAndUpdate(
      { _id: couponId },
      payload,
      { new: true }
    );

    return NextResponse.json({ result: userPackage, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { couponId: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
      );
    }
    
    // delet the coupan from the db also
    
    const couponId = params.couponId;
    
  try {
    await startDB();

    const db_response = await Coupon.findOne({
      coupon_code: couponId,
    });

    if (db_response.coupon_type === "stripe") {
      const response = await stripe.coupons.del(couponId);
      if (response.deleted) {
        const deleted = await Coupon.findOneAndDelete({
          coupon_code: couponId,
        });
        return NextResponse.json({ result: deleted, success: true });
      } else {
        return NextResponse.json(
          { result: "something went wrong", success: false },
          { status: 500 }
        );
      }
    } else {
      const deleted =await Coupon.findOneAndDelete({
        coupon_code: couponId,
      });
      return NextResponse.json({ result: deleted, success: true });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
