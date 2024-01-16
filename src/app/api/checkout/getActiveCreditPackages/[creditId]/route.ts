import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreditsPackage from "@/db/schemas/CreditsPackage";
import startDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: any,
  { params }: { params: { creditId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  const creditId = params.creditId;
  const payload = await req.json();

  try {
    await startDB();

    let updatedCredit = await CreditsPackage.findOneAndUpdate(
      { _id: creditId },
      payload,
      { new: true }
    );

    return NextResponse.json({ result: updatedCredit, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: any,
  { params }: { params: { creditId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }

  const creditId = params.creditId;
  try {
    await startDB();
    let updatedCredit = await CreditsPackage.findByIdAndDelete(
      { _id: creditId },
      {}
    );
    return NextResponse.json({ result: updatedCredit, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
