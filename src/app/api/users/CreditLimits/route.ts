import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import CreditsLimit from "@/db/schemas/CreditsLimit";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET(req: any) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { result: `Not Authorised`, success: false },
            { status: 401 }
        );
    }
    try {

        await startDB();

        const creditLimits = await CreditsLimit.find({});

        return NextResponse.json(
            {
                result: creditLimits[0],
                success: true,
            },
            { status: 200 }
        );

    } catch {
        return NextResponse.json(
            {
                result: "Something Went Wrong",
                success: false,
            },
            { status: 500 }
        );
    }
}
