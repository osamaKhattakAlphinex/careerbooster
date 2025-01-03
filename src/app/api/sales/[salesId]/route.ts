import Sales from "@/db/schemas/Sales";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { salesId: string } }
) {
  try {
    await startDB();
    const sale = await Sales.deleteOne({ _id: params.salesId });
    return NextResponse.json({
      result: sale,
      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { salesId: string } }
) {
  try {
    await startDB();
    const { fullname, status, amount, phone, service } = await req.json();
    const updatedSale = await Sales.findOneAndUpdate(
      { _id: params.salesId },
      {
        fullname: fullname,
        amount: amount,
        status: status,
        service: service,
        phone: phone,
      },
      { new: true }
    );

    return NextResponse.json(
      { result: updatedSale, success: true },
      { status: 200 }
    );
  } catch (error) {

    return NextResponse.json(
      {
        error: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
