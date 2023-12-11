import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
export async function DELETE(
  req: any,
  { params }: { params: { linkedinAboutId: string } }
) {
  const session = await getServerSession(authOptions);
  let email: any = "";

  if (session) {
    try {
      const linkedinAboutId = params.linkedinAboutId;
      email = session?.user?.email;
      await startDB();
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          $pull: {
            linkedInAbouts: { id: linkedinAboutId },
          },
        },
        { new: true }
      );
      return NextResponse.json(
        { success: true, linkedInAbouts: updatedUser.linkedInAbouts },
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
