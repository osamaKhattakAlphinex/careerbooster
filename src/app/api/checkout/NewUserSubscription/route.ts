import startDB from "@/lib/db";
import UserSubscription from "@/db/schemas/UserSubscription";
import { NextResponse } from "next/server";
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
    const body = await req.json();
    if (req.method === "POST") {
      try {
        await startDB();

        const { userPackageId, userId, expirationDateTime } = body;

        const userSubscription = new UserSubscription({
          userPackage: userPackageId,
          user: userId,
          expirationDateTime,
        });

        await userSubscription.save();

        return NextResponse.json(
          { result: userSubscription, success: true },
          { status: 201 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { result: "Server Error", success: false },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { result: "Method Not Allowed", success: false },
        { status: 405 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 404 }
    );
  }
}
