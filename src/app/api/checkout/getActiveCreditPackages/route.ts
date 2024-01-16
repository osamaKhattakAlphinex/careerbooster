import startDB from "@/lib/db";
import { NextResponse } from "next/server";
import CreditsPackage from "@/db/schemas/CreditsPackage";

export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function GET() {
    const status = "active";
    if (!status) {
        return NextResponse.json(
            { result: "Bad Request", success: false },
            { status: 400 }
        );
    }

    await startDB();

    const creditPackages = await CreditsPackage.find({ status }).sort({ amount: 1 });

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
