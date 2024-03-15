import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { updateTrainedBotEntry } from "@/helpers/updateTrainBotEntry";

export async function PUT(
  req: any,
  { params }: { params: { coverLetterId: string } }
) {
  let email: any = "";
  const session = await getServerSession(authOptions);

  email = session?.user?.email;

  const requestBody = await req.json();
  const coverLetterId = params.coverLetterId;

  if (session) {
    try {
      await startDB();

      const updatedUser = await User.findOneAndUpdate(
        { email: email, "coverLetters.id": coverLetterId },
        {
          $set: {
            "coverLetters.$.coverLetterText": requestBody.coverLetterText,
            "coverLetters.$.name": requestBody.name,
            "coverLetters.$.phone": requestBody.phone,
            "coverLetters.$.email": requestBody.email,
            "coverLetters.$.address": requestBody.address,
            "coverLetters.$.date": requestBody.date,
          },
        },
        { new: true }
      );

      updateTrainedBotEntry({
        entryId: coverLetterId,
        type: "coverLetter.write",
        output: requestBody.coverLetterText,
      });

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
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { coverLetterId: string } }
) {
  console.log("params",params);
  const session = await getServerSession(authOptions);
  let email: any = "";

  if (session) {
    try {
      const coverLetterId = params.coverLetterId;

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
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}
