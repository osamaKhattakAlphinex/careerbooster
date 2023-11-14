import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const reqBody = await req.json();
    const data = reqBody?.data;

    if (!data || !data.email) {
      return NextResponse.json(
        {
          error: "Bad Request",
          success: false,
        },
        { status: 400 }
      );
    }

    await startDB();

    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: data.email },
        { $set: { ...data } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      if (updatedUser) {
        return NextResponse.json(
          {
            msg: "Updated",
            success: true,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            error: "Error User not found",
            success: false,
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: "Error Updating Files",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
