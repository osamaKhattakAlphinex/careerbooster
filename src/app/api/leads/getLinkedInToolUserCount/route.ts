import LinkedinToolEntrie from "@/db/schemas/LinkedinToolEntrie";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await startDB();

    // Get the current date
    const currentDate = new Date();
    // Get the first day of the current month
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    // Get the last day of the current month
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    // Calculate the date of 1 week ago
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    // Get the first day of the current year
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

    // QUERIES
    const total = await LinkedinToolEntrie.count();
    const thisMonth = await LinkedinToolEntrie.countDocuments({
      createdAt: { $gt: firstDay, $lt: lastDay },
    });
    const thisWeek = await LinkedinToolEntrie.countDocuments({
      createdAt: { $gt: oneWeekAgo, $lt: currentDate },
    });
    const thisYear = await LinkedinToolEntrie.countDocuments({
      createdAt: { $gt: firstDayOfYear, $lt: currentDate },
    });
    return NextResponse.json({
      total,
      thisMonth,
      thisWeek,
      thisYear,
      success: true,
    });
  } catch {
    return NextResponse.json({
      result: "Something Went Wrong",
      success: false,
    });
  }
}
