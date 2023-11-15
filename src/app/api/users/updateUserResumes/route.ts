import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const session = await getServerSession(authOptions);
    const _body = await req.json();
    if (session) {
      // const email = req?.body?.email;
      const email = _body.email;
      // const resumes = req?.body?.resumes;
      const resumes = _body.resumes;

      if (resumes && email) {
        try {
          await startDB();

          // Find the user by email
          const user = await User.findOne({ email });

          if (!user) {
            return NextResponse.json(
              {
                result: "User not found",
                success: false,
              },
              { status: 404 }
            );
          }

          // Update the resumes array with the new data
          user.resumes = resumes;

          // Save the updated user document
          await user.save();

          return NextResponse.json(
            {
              result: "successful",
              success: true,
            },
            { status: 200 }
          );
        } catch (error) {
          return NextResponse.json(
            {
              result: "Error updating resumes",
              success: false,
            },
            {
              status: 500,
            }
          );
        }
      } else {
        return NextResponse.json(
          {
            result: "Something Went Wrong",
            success: false,
          },
          {
            status: 400,
          }
        );
      }
    } else {
      // Not Signed in
      return NextResponse.json(
        {
          result: "Forbidden",
          success: false,
        },
        {
          status: 401,
        }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: "Something Went Wrong",
        success: false,
      },
      {
        status: 404,
      }
    );
  }
}
