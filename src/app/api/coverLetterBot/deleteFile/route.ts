import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const url = new URL(req.url);
    if (req.method !== "POST") {
      return NextResponse.json(
        { result: "Method not Allowed", success: false },
        { status: 405 }
      );
    }

    const { fileName } = body;
    const email: any = url.searchParams.get("email");

    if (!fileName) {
      return NextResponse.json(
        { result: "File name is required", success: false },
        { status: 400 }
      );
    }

    try {
      await startDB();

      // const user = await User.findOne({ email: email }, { files: 1 });
      // const fileObject = user.files.find(
      //   (file: any) => file.fileName === fileName
      // );
      // console.log("file: " + fileObject);
      const user = await User.findOne({ email: email });

      if (user) {
        const updatedFiles = user.files.filter(
          (file: any) => file.fileName !== fileName
        );

        // Updating the user document in the database to remove the file
        await User.findOneAndUpdate(
          { email: email },
          { $set: { files: updatedFiles } },
          { new: true }
        );

        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
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
