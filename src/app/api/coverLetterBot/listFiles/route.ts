import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (email) {
      await startDB();
      const user = await User.findOne({ email: email }, { files: 1 });

      if (user) {
        const filesList = user.files;
        const fileNamesArray = await filesList.map(
          (file: any) => file.fileName
        );
        return NextResponse.json(
          { result: fileNamesArray, success: true },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { result: "User Not Found", success: false },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { result: "something went wrong", success: false },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
