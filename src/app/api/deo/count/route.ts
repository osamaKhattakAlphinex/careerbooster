import Job from "@/db/schemas/Job";
import { NextRequest, NextResponse } from "next/server";
const { ObjectId } = require('mongodb');
export async function GET(req: NextRequest) {
    // try {
        
    // } catch (error) {
        
    // }
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
        addedByUserId: new ObjectId(id)
      }
    },
    {
      $group: {
        _id: "$addedByUserId",
        totalProposals: { $sum: "$noOfProposals" }
      }
    }
  ])
  const totalProposals = totalProposalsResult.length > 0 ? totalProposalsResult[0].totalProposals : 0;

  return NextResponse.json(
    { success: true, total: totalJobs, activeJobs: featuredJobs, totalProposals: totalProposals},
    { status: 200 }
  );
}
