import Payment from "@/db/schemas/Payment";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";

export async function POST(req: NextRequest) {
  try {
    await startDB();

    const { decryptionKey } = await req.json();

    const cryptr = new Cryptr(decryptionKey, {
      encoding: "base64",
      pbkdf2Iterations: 10000,
      saltLength: 10,
    });

    let payments = await Payment.find({}).sort({createdAt: -1});

    payments = payments.map((pay) => {
      return {
        PackageId: pay.PackageId,
        userEmail: cryptr.decrypt(pay.userEmail),
        amountPaid: cryptr.decrypt(pay.amountPaid),
        createdAt: pay.createdAt,
        _id: pay._id,
      };
    });

    return NextResponse.json({ payments, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: "Server Error", success: false },
      { status: 500 }
    );
  }
}
