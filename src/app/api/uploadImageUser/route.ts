import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: any) {
  const { converted } = await req.json();
  //   const imageBlob = data.get("imageBuffer");
  //   const contentType = data.get("contentType");

  //   const bufferView = new Uint8Array(imageBlob);
  //   console.log(bufferView);
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      await startDB();
      const user = await User.findOneAndUpdate(
        { email: session.user?.email },
        {
          $set: {
            profileImage: converted,
          },
        },
        { new: true }
      );

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("error");
      return NextResponse.json(
        { result: "Server Error", success: false },
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
