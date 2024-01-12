import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
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
    let _body = await req.json();

    // const email = req?.body?.email;
    const email = _body.email;
    // const fileName = req?.body?.fileName;
    const fileName = _body.email;

    if (email && fileName) {
      const oldPath = path.join(
        process.cwd(),
        `/public/files/temp/${fileName}`
      );
      const newPath = path.join(
        process.cwd(),
        `/public/files/userResumes/${email}/${fileName}`
      );

      let directory = `/public/files/userResumes/${email}`;

      try {
        await fs.readdir(path.join(process.cwd() + directory));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + directory));
      }

      await fs.rename(oldPath, newPath);

      return NextResponse.json(
        {
          msg: "File moved",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Bad Request",
          success: false,
        },
        { status: 500 }
      );
      // return res.status(500).json({ error: "Bad Request" });
    }
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}
