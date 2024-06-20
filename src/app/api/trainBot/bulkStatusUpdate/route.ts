import { NextRequest, NextResponse } from "next/server";
import startDB from "@/lib/db";
import TrainBot from "@/db/schemas/TrainBot";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorized", success: false },
      { status: 401 }
    );
  }

  try {
    const { ids, newStatus } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({
        success: false,
        data: [],
        error: "Invalid or empty array of IDs provided",
      });
    }

    await startDB();

    const updatedRecords = await TrainBot.updateMany(
      { _id: { $in: ids } },
      { $set: { status: newStatus } }
    );

    return NextResponse.json({
      success: true,
      data: updatedRecords,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return NextResponse.json({
      success: false,
      error: "An error occurred while processing the request",
    });
  }
};
