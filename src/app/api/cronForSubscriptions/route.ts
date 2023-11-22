import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await startDB();

  const users = await User.find(
    { role: "user" },
    { userPackageExpirationDate: 1 }
  );
  const currentDate = new Date(); // Get the current date/time

  const filteredData: any = users.filter((user) => {
    if (user.userPackageExpirationDate) {
      const expirationDate = new Date(user.userPackageExpirationDate);
      return expirationDate < currentDate; // Compare expiration date with current date
    }
  });

  if (filteredData.length > 0) {
    const idsToUpdate = filteredData.map((user: any) => user._id); // Extract _id values

    const keysToDelete = [
      "userPackage",
      "userPackageUsed",
      "userPackageExpirationDate",
    ];
    const unsetFields: any = {};
    keysToDelete.forEach((key) => {
      unsetFields[key] = 1;
    });

    await User.updateMany(
      { _id: { $in: idsToUpdate } },
      { $unset: unsetFields }
    );

    return NextResponse.json(
      { result: "Database Updated", success: true },
      { status: 200 }
    );
  }
}
