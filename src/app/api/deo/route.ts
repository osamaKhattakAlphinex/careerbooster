import Job from "@/db/schemas/Job";
import startDB from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    await startDB();
    const url = new URL(req.url);
    const deoId: any = url.searchParams.get("deoId");
    const jobToShow: any = url.searchParams.get("jobs");

    let jobs = [];
    if (jobToShow === "featured") {
      jobs = await Job.find({ featured: 1 });
    } else {
      jobs = await Job.find({ addedByUserId: deoId });
    }
    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    await startDB();
    let payload = await request.json();

    const job = new Job({ ...payload });
    const response = job.save();

    return NextResponse.json({ success: true, response: job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  let payload = await req.json();
  const url = new URL(req.url);
  const jobId = url.searchParams.get("id");
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    await startDB();

    let job = await Job.findOneAndUpdate({ _id: jobId }, payload, {
      new: true,
    });

    return NextResponse.json({ data: job, success: true });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const jobId = url.searchParams.get("id");
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  try {
    await startDB();

    let job = await Job.findByIdAndDelete({ _id: jobId });

    return NextResponse.json({ data: job, success: true });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
