import { NextApiHandler } from "next";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export async function POST(req: any) {
  const reqBody = await req.json();
  const { email, resumeData } = reqBody;

  if (!email || !resumeData) {
    return NextResponse.json(
      { result: "Bad Request", success: false },
      { status: 400 }
    );
  }

  try {
    await startDB();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { result: "User Nof Found!", success: false },
        { status: 404 }
      );
    }

    // Check if the user's resume array is empty
    if (!user.resumes || user.resumes.length === 0) {
      // If It{"'"}s empty, create a new array with the new resume object
      user.resumes = [resumeData];
    } else {
      // If not empty, check if the new Resume{"'"}s id matches an existing record
      const existingResumeIndex = user.resumes.findIndex(
        (resume: any) => resume.id === resumeData.id
      );

      if (existingResumeIndex !== -1) {
        // If matching record found, update it
        user.resumes[existingResumeIndex] = resumeData;
      } else {
        // If no matching record found, add the new resume object to the array
        user.resumes.unshift(resumeData);
      }
    }

    // Add one to resumes_generation in userPackageUsed
    if (user.userPackageUsed && user.userPackageUsed.resumes_generation < 5) {
      user.userPackageUsed.resumes_generation = user.resumes.length;
    }

    // Save the updated user document
    await user.save();

    return NextResponse.json({ success: true }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { result: "Error updating resume", success: false },
      { status: 500 }
    );
  }
}
