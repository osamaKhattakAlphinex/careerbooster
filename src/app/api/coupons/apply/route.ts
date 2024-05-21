import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Coupon from "@/db/schemas/Coupon";
import { authOptions } from "../../auth/[...nextauth]/route";
import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";

export async function POST(request: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    // await startDB();
    const { coupon } = await request.json();

    let fetchedCoupon = await Coupon.findOne({ coupon_code: coupon });

    // get the coupan details from the db
    if (fetchedCoupon) {
      if (fetchedCoupon.valid) {
        if (session.user?.email) {
          await Coupon.findOneAndUpdate(
            { coupon_code: coupon },
            { $inc: { times_redeemed: 1 } },
            { new: true, useFindAndModify: false }
          );      
          updateUserCreditsByAdmin(session.user?.email, fetchedCoupon.credits);
        }
      } else {
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

    // const response = await Coupon.create({ ...payload });
    return NextResponse.json(
      { result: "coupon successfully applied", success: true },
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
