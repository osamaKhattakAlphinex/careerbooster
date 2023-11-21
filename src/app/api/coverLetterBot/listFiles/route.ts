// import fs from "fs";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import fs from "fs/promises";
import { useSearchParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import path from "path";
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
    const url = new URL(req.url);
    // const params = new URLSearchParams(url.search);

    const email = url.searchParams.get("email");
    //   const email = String(body.query.email);
    if (email) {
      await startDB();
      // Define the directory path you want to list files from
      // const directoryPath = path.join(
      //   process.cwd(),
      //   "public",
      //   "files",
      //   "userResumes",
      //   email
      // );

      // try {
      //   await fs.readdir(directoryPath);
      // } catch (error) {
      //   await fs.mkdir(directoryPath);
      // }
      // const filesList =  await User.find({})
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
      // try {
      //   // Use fs.promises.readdir to read the contents of the directory
      //   const files = await fs.readdir(directoryPath);

      //   // Send the list of files as a JSON response

      // } catch (error) {
      //   console.error("Error reading directory:", error);
      //   return NextResponse.json(
      //     {
      //       result: "An error occurred while reading the directory",
      //       success: false,
      //     },
      //     { status: 500 }
      //   );
      // }
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
