import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { updateTrainedBotEntry } from "@/helpers/updateTrainBotEntry";

export async function postCoverLetter(payload: any) {
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
export async function POST(request: any) {
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

// export async function GET(request: any) {
//   try {
//     await startDB();
//     const coverletters = await user.find();
//     return NextResponse.json({ success: true, coverletters }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { result: "Internal Server Error", success: false },
//       { status: 500 }
//     );
//   }
// }
