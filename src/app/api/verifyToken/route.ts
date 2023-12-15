import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  const body = await req.json();

  const { token } = body;
  const secret = process.env.JWT_SECRET;
  if (secret) {
    try {
      const decoded = jwt.verify(token, secret);
      // Do something with the decoded payload

      return NextResponse.json(
        { result: decoded, success: true },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
