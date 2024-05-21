import Coupon from "@/db/schemas/Coupon";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const coupon_code = url?.searchParams.get("coupon");

    await startDB();
    const coupon = await Coupon.findOne({ coupon_type: "paypal", coupon_code });
    if (coupon) {
      if (!coupon.valid) {
        return NextResponse.json(
          { result: "Coupon Not Valid", success: false },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { result: "Coupon Not Found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, result: coupon },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
