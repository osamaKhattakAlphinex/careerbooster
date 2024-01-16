import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import CreditsPackage from "@/db/schemas/CreditsPackage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(request: any) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { result: "Not Authorised", success: false },
            { status: 401 }
        );
    }

    try {
        await startDB();
        const payload = await request.json();
        let credit = new CreditsPackage(payload);
        const response = await credit.save();

        return NextResponse.json(
            { result: response, success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { result: "Internal Server Error", success: false },
            { status: 404 }
        );
    }
}

export async function GET() {
    const status = "active";
    if (!status) {
        return NextResponse.json(
            { result: "Bad Request", success: false },
            { status: 400 }
        );
    }

    await startDB();

    const creditPackages = await CreditsPackage.find({ status }).sort({
        amount: 1,
    });

    if (!creditPackages) {
        return NextResponse.json(
            { result: "Packages not found", success: false },
            { status: 404 }
        );
    }
    return NextResponse.json(
        { result: creditPackages, success: true },
        { status: 200 }
    );
}
