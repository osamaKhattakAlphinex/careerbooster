import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  await startDB();

  const oldUser = await User.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      {
        error: "An account with the same email already exist! ",
      },
      { status: 500 }
    );
  }

  const user = await User.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      alertConsent: user.alertConsent,
    },
  });

};
