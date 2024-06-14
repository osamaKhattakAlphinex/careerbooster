import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { updateTrainedBotEntry } from "@/helpers/updateTrainBotEntry";

export async function postEmail(payload: any) {
  await startDB();

  const user = await User.findOne({ email: payload.userEmail });

  if (!user) {
    return NextResponse.json({ result: "", success: false }, { status: 404 });
  } else if (!user.emails || user.emails.length === 0) {
    user.emails = [payload];
  } else {
    // to append at start of array
    user.emails.unshift(payload)
    // user.emails.push(payload);
  }

  const response = await user.save();
  return response;
}
export async function putEmail(payload: any) {
  await startDB();
  
    if(payload.generationType === "firstFollowUp"){

      await User.findOneAndUpdate(
        { email: payload.userEmail, "emails.id": payload.id },
        {
          $set: {
            "emails.$.emailFirstFollowUpText": payload.emailText,
          },
        },
        { new: true }
      );
    } else if (payload.generationType === "secondFollowUp"){
      await User.findOneAndUpdate(
        { email: payload.userEmail, "emails.id": payload.id },
        {
          $set: {
            "emails.$.emailSecondFollowUpText": payload.emailText,
          },
        },
        { new: true }
      );
    }
  
  return "ok";
}
async function updateEmail(payload: any) {
  await startDB();

  await User.findOneAndUpdate(
    { email: payload.email, "emails.id": payload.id },
    {
      $set: {
        "emails.$.emailText": payload.text,
      },
    },
    { new: true }
  );
  await updateTrainedBotEntry({
    entryId: payload.id,
    type: "tool.email",
    output: payload.text,
  });
  return "ok";
}
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await startDB();
      const payload = await request.json();

      const response = await updateEmail(payload);
      if (response) {
        return NextResponse.json(
          { result: "updated successfully", success: true },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { result: response, success: true },
        { status: 200 }
      );
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

