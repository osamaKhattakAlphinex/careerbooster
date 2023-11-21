import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
  req: any,
  { params }: { params: { coverLetterId: string } }
) {
  const requestBody = await req.json(); // To read request data
  // const url = new URL(req.url);
  // const coverLetterId = url.searchParams.get("coverLetterId");
  const coverLetterId = params.coverLetterId;
  try {
    let email: any = "";

    const session = await getServerSession(authOptions);

    email = session?.user?.email;

    await startDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: email, "coverLetters.id": coverLetterId },
      {
        $set: {
          "coverLetters.$.coverLetterText": requestBody.coverLetterText,
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, results: updatedUser.coverLetters },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { coverLetterId: string } }
) {
  try {
    let email: any = "";
    const coverLetterId = params.coverLetterId;

    const session = await getServerSession(authOptions);

    email = session?.user?.email;

    await startDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { coverLetters: { id: coverLetterId } } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, coverLetters: updatedUser.coverLetters },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
