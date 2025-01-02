
import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Job from "@/db/schemas/Job";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  try {
    await startDB();

    let idsToDelete = await req.json();
    idsToDelete = idsToDelete.dataSelection;

    if (
      !idsToDelete ||
      !Array.isArray(idsToDelete) ||
      idsToDelete.length === 0
    ) {
      return NextResponse.json({
        success: false,
        data: [],
        error: "Invalid or empty array of IDs provided",
      });
    }

    await Job.deleteMany({ _id: { $in: idsToDelete } });

    return NextResponse.json(
      {
        success: true,
        message: "Records Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
};
