import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
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
    if (req.method !== "POST") {
      return NextResponse.json(
        { result: "Method not Allowed", success: false },
        { status: 405 }
      );
    }

    const { fileName } = body;

    if (!fileName) {
      return NextResponse.json(
        { result: "File name is required", success: false },
        { status: 400 }
      );
    }

    // Define the directory path where the file is located
    const directoryPath = path.join(process.cwd(), "public", "files", "bio");
    const filePath = path.join(directoryPath, fileName);

    try {
      // Use fs.promises.unlink to delete the file
      await fs.promises.unlink(filePath);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("Error deleting file:", error);
      return NextResponse.json(
        {
          result: "An error occurred while deleting the file",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
