import Job from "@/db/schemas/Job";
import startDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await startDB();
    const url = new URL(req.url);
    const deoId = url.searchParams.get("deoId");
    const jobToShow = url.searchParams.get("jobs");
    const findOne = url.searchParams.get("findOne");
    const jobTitlequery = url.searchParams.get("query");
    const skillsParam = url.searchParams.get("skills");
    const skills = skillsParam ? skillsParam.split(",") : [];
    const jobLocationquery = url.searchParams.get("location");
    const limit = Number(url.searchParams.get("limit"));
    const page = Number(url.searchParams.get("page"));
    const skip = (page - 1) * limit;
    const jobCategory = url.searchParams.get("jobCategory");
    let jobs;
    let total;
    let searchCondition: any = {};
    if (findOne) {
      jobs = await Job.findOne({ _id: findOne });
    } else if (jobToShow === "featured") {
      searchCondition.featured = 1;
      if (jobTitlequery !== "" || jobLocationquery !== "") {
        if (jobTitlequery !== "" && jobLocationquery == "") {
          searchCondition.jobTitle = { $regex: jobTitlequery, $options: "i" };
          jobs = await Job.find(searchCondition)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        } else if (jobTitlequery == "" && jobLocationquery !== "") {
          searchCondition.location = {
            $regex: jobLocationquery,
            $options: "i",
          };
          jobs = await Job.find(searchCondition)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        }
        total = await Job.count({ searchCondition });
      } else if (skills.length > 0) {
        const halfSkillsCount = Math.ceil(skills.length / 3);
        jobs = await Job.aggregate([
          {
            $match: {
              featured: 1,
            },
          },
          {
            $addFields: {
              matchedSkillsCount: {
                $size: {
                  $filter: {
                    input: "$skills",
                    as: "jobSkill",
                    cond: {
                      $in: [
                        { $toLower: "$$jobSkill" },
                        skills.map((skill) => skill.toLowerCase()),
                      ],
                    },
                  },
                },
              },
            },
          },
          {
            $match: {
              matchedSkillsCount: { $gte: halfSkillsCount },
            },
          },
          {
            $project: {
              matchedSkillsCount: 0, // Optionally remove the matchedSkillsCount field from the final output
            },
          },
        ])
          .limit(limit)
          .skip(skip);

        const jobCount = await Job.aggregate([
          {
            $match: {
              featured: 1,
            },
          },
          {
            $addFields: {
              matchedSkillsCount: {
                $size: {
                  $filter: {
                    input: "$skills",
                    as: "jobSkill",
                    cond: {
                      $in: [
                        { $toLower: "$$jobSkill" },
                        skills.map((skill) => skill.toLowerCase()),
                      ],
                    },
                  },
                },
              },
            },
          },
          {
            $match: {
              matchedSkillsCount: { $gte: halfSkillsCount },
            },
          },
          {
            $project: {
              matchedSkillsCount: 0, // Optionally remove the matchedSkillsCount field from the final output
            },
          },
        ]);
        total = jobCount.length;
      } else if (jobCategory !== "Choose a Category") {
        searchCondition.category = jobCategory;
        jobs = await Job.find(searchCondition)
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);
        total = await Job.count({ category: jobCategory });
      } else {
        jobs = await Job.find({ featured: 1 })
          .sort({
            createdAt: -1,
          })
          .limit(limit)
          .skip(skip);
        total = await Job.count({ featured: 1 });
      }
    } else {
      jobs = await Job.find({ addedByUserId: deoId })
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .skip(skip);
      total = await Job.count({ addedByUserId: deoId });
    }
    return NextResponse.json(
      { success: true, data: jobs, total: total },
      { status: 200 }
    );
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
    let { payload } = await request.json();

    const existingJob = await Job.findOne({ link: payload.link });

    if (existingJob) {
      return NextResponse.json(
        { result: "Job with same link already exists!", success: false },
        { status: 403 }
      );
    }

    const job = new Job({ ...payload });
    await job.save();

    return NextResponse.json({ success: true, response: job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  let body = await req.json();
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId");
  try {
    await startDB();

    let job = await Job.findOneAndUpdate({ _id: jobId }, body, { new: true });

    return NextResponse.json({ data: job, success: true });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { result: "Not Authorised", success: false },
      { status: 401 }
    );
  }
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId");
  try {
    await startDB();

    let job = await Job.findByIdAndDelete({ _id: jobId });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 404 }
    );
  }
}
