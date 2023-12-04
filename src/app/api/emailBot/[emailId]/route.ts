import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
  req: any,
  { params }: { params: { emailId: string } }
) {
  let email: any = "";
  const session = await getServerSession(authOptions);

  email = session?.user?.email;

  const requestBody = await req.json();
  const emailId = params.emailId;

  if (session) {
    try {
      await startDB();

      const updatedUser = await User.findOneAndUpdate(
        { email: email, "emails.id": emailId },
        {
          $set: {
            "emails.$.emailText": requestBody.emailText,
          },
        },
        { new: true }
      );

      return NextResponse.json(
        { success: true, results: updatedUser.emails },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { result: "Internal Server Error", success: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { emailId: string } }
) {
  const session = await getServerSession(authOptions);
  let email: any = "";

  if (session) {
    try {
      const emailId = params.emailId;

      email = session?.user?.email;

      await startDB();

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $pull: { emails: { id: emailId } } },
        { new: true }
      );

      return NextResponse.json(
        { success: true, emails: updatedUser.emails },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { result: "Internal Server Error", success: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}
