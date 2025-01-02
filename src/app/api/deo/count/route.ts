import Job from "@/db/schemas/Job";
import { NextRequest, NextResponse } from "next/server";
const { ObjectId } = require("mongodb");
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const totalJobs = await Job.count({
      addedByUserId: id,
    });
    const featuredJobs = await Job.count({
      addedByUserId: id,
      featured: 1,
    });
    const totalProposalsResult = await Job.aggregate([
      {
        $match: {
          addedByUserId: new ObjectId(id),
        },
      },
      {
        $group: {
          _id: "$addedByUserId",
          totalProposals: { $sum: "$noOfProposals" },
        },
      },
    ]);
    const totalProposals =
      totalProposalsResult.length > 0
        ? totalProposalsResult[0].totalProposals
        : 0;

    return NextResponse.json(
      {
        success: true,
        total: totalJobs,
        activeJobs: featuredJobs,
        totalProposals: totalProposals,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
