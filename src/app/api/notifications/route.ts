import Notification from "@/db/schemas/Notification";
import startDB from "@/lib/db";
import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await startDB();
    const notification = await Notification.find();
    return NextResponse.json({
      result: notification,
      success: true,
      status: 200,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
      status: 404,
    });
  }
}

export async function POST(req: any) {
  try {
    await startDB();
    const payload = await req.json();
    const notification = new Notification(payload);
    const response = await notification.save();

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
