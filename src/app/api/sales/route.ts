import Sales from "@/db/schemas/Sales";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await startDB();

    const sales = await Sales.find({});

    return NextResponse.json({
      result: sales,
      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}

export async function POST(req: Request) {
  try {
    await startDB();

    const { fullname, status, amount, phone, service } = await req.json();

    console.log(fullname, status, amount, phone, service);

    const newSale = new Sales({
      fullname: fullname,
      status: status,
      amount: amount,
      phone: phone,
      service: service,
    });

    await newSale.save();

    return NextResponse.json(
      { result: newSale, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
