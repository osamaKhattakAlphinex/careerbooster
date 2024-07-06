import Job from "@/db/schemas/Job";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Material UI",
  "Git",
  "Redux",
  "TypeScript",
  "Data Visualization",
  "Machine Learning",
  "Artificial Intelligence",
  "Vue.js",
  "Agile",
  "Project Management",
  "Linux",
];


export async function GET() {
  try {
    await startDB();
    const halfSkillsCount = Math.ceil(skills.length / 3);

    const jobs = await Job.aggregate([
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
    ]).limit(4).skip(1);
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
    ])
    console.log(jobCount.length, jobs.length);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
