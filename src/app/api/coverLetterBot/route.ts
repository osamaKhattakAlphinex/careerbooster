import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { updateTrainedBotEntry } from "@/helpers/updateTrainBotEntry";
import { CoverLetterCard } from "../../../../types/ObjTypes/types";

export async function postCoverLetter(payload: CoverLetterCard) {
  try {
    await startDB();
    const user = await User.findOne({ email: payload.userEmail });
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    } else if (!user.coverLetters || user.coverLetters.length === 0) {
      user.coverLetters = [payload];
    } else {
      user.coverLetters.unshift(payload);
    }
    await user.save();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
async function updateCoverLetter(payload: any) {
  try {
    await startDB();

    await User.findOneAndUpdate(
      { email: payload.email, "coverLetters.id": payload.id },
      {
        $set: {
          "coverLetters.$.coverLetterText": payload.text,
        },
      },
      { new: true }
    );
    await updateTrainedBotEntry({
      entryId: payload.id,
      type: "coverLetter.write",
      output: payload.text,
    });
    return "ok";
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const payload = await request.json();
      const response = await updateCoverLetter(payload);
      if (response) {
        return NextResponse.json(
          { result: "updated successfully", success: true },
          { status: 200 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { result: "Internal Server Error", success: false },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
}

