import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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
    const session = await getServerSession(authOptions);
    const _body = await req.json();
    // console.log(_body);

    if (session) {
      // const { type, email } = _body;

      if (!_body?.email) {
        return NextResponse.json(
          {
            result: "Bad Request. 'email' is required.",
            success: false,
          },
          { status: 400 }
        );
      }

      try {
        await startDB();
        const user = await User.findOne({ email: _body?.email }).select(
          "-password"
        );

        if (!user) {
          return NextResponse.json(
            {
              result: "User not found",
              success: false,
            },
            { status: 404 }
          );
        }

        // if (user.userPackageUsed) {
        //   switch (_body?.type) {
        //     case "resumes_generation":
        //       user.userPackageUsed.resumes_generation += 1;
        //       break;
        //     case "keywords_generation":
        //       user.userPackageUsed.keywords_generation += 1;
        //       break;
        //     case "cover_letter_generation":
        //       user.userPackageUsed.cover_letter_generation += 1;
        //       break;
        //     case "pdf_files_upload":
        //       user.userPackageUsed.pdf_files_upload += 1;
        //       break;
        //     case "job_desc_generation":
        //       user.userPackageUsed.job_desc_generation += 1;
        //       break;
        //     case "headline_generation":
        //       user.userPackageUsed.headline_generation += 1;
        //       break;
        //     case "about_generation":
        //       user.userPackageUsed.about_generation += 1;
        //       break;
        //     case "consulting_bids_generation":
        //       user.userPackageUsed.consulting_bids_generation += 1;
        //       break;
        //     case "email_generation":
        //       user.userPackageUsed.email_generation += 1;
        //       break;
        //     case "review_resume":
        //       user.userPackageUsed.review_resume += 1;
        //       break;
        //     // Add more cases for other types
        //   }
        // }

        await user.save();

        return NextResponse.json(
          {
            result: user,
            success: true,
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          {
            result: "Error updating user data",
            success: false,
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        result: "Something Went Wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
