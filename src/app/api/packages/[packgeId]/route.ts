import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CreditsPackage from "@/db/schemas/CreditsPackage";

export async function PUT(
  req: NextRequest,
  { params }: { params: { packgeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  const packgeId = params.packgeId;
  const payload = await req.json();

  try {
    await startDB();

    let creditPackage = await CreditsPackage.findOneAndUpdate(
      { _id: packgeId },
      payload,
      { new: true }
    );

    return NextResponse.json({ result: creditPackage, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { packgeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  const packgeId = params.packgeId;
  try {
    await startDB();
    let creditPackage = await CreditsPackage.findByIdAndDelete(
      { _id: packgeId },
      {}
    );
    return NextResponse.json({ result: creditPackage, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
