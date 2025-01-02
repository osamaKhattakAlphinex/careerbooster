import Sales from "@/db/schemas/Sales";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const limit = Number(url.searchParams.get("limit"));
    const page = Number(url.searchParams.get("page"));
    const skip = (page - 1) * limit;
    await startDB();
    const sales = await Sales.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    const total = await Sales.count();

    return NextResponse.json({
      result: sales,
      total: total,
      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await startDB();

    const payload = await req.json();

    const newSale = new Sales(payload);

    await newSale.save();

    return NextResponse.json(
      { result: newSale, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error. Order Not Created",
        success: false,
      },
      { status: 500 }
    );
  }
}
