import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await startDB();

    const jobProfiles = await User.aggregate([
      { $match: { desiredJobTitle: { $exists: true, $ne: "" } } },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          jobTitle: { $arrayElemAt: ["$experience.jobTitle", 0] },
          expectedSalary: 1,
          desiredJobTitle: 1,
          locationPreference: 1,
        },
      },
    ]);
    return NextResponse.json(
      { success: true, result: jobProfiles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
