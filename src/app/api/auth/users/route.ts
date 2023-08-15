import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";

interface NewUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface NewUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;
  await startDB();

  const oldUser = await User.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      { error: "Email already exist!" },
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
    },
  });
};
