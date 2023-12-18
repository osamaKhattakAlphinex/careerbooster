import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  // Define the directory path you want to list files from
  const directoryPath = path.join(process.cwd(), "public", "files", "bio");

  try {
    // Use fs.promises.readdir to read the contents of the directory
    const files = await fs.promises.readdir(directoryPath);

    // Send the list of files as a JSON response
    return NextResponse.json({ result: files, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
