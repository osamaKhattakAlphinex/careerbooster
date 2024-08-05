import { NextRequest, NextResponse } from "next/server";
import natural from "natural";
import User from "@/db/schemas/User";

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    const tokenizer = new natural.WordTokenizer();
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    let userProfiles = await User.find({
      role: "user",
      desiredJobTitle: { $exists: true, $ne: "" },
    });
    if (userProfiles.length === 0) {
      return NextResponse.json(
        { success: false, result: "No job seeker profiles exists" },
        { status: 404 }
      );
    }

    tfidf.addDocument(tokenizer.tokenize(jobDescription));

    userProfiles.forEach((user) =>
      tfidf.addDocument(tokenizer.tokenize(user.uploadedResume.fileContent))
    );
    const scores: any = [];
    userProfiles.forEach((user, index) => {
      const score = tfidf.tfidf(jobDescription, index + 1); // index + 1 because 0 is the job description
      scores.push({
        score,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.experience[0].jobTitle,
        expectedSalary: user.expectedSalary,
        desiredJobTitle: user.desiredJobTitle,
        locationPreference: user.locationPreference,
      });
    });

    scores.sort((a, b) => b.score - a.score);
    return NextResponse.json(
      { success: true, result: scores },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
