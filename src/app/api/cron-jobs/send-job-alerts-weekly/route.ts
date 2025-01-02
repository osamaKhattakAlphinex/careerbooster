import Job from "@/db/schemas/Job";
import User from "@/db/schemas/User";
import startDB from "@/lib/db";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 5 minutes
export const dynamic = "force-dynamic";
import nodemailer from "nodemailer";

let email_template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Job Opportunities for You</title>
    <style media="all" type="text/css">
       body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        text-align: center;
        background-color: #f4f5f6;
      }
      table {
        margin-left: auto;
        margin-right: auto;
        border-collapse: collapse;
        border-spacing: 0;
      }
      .container {
        background-color: #030712;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #030712;
        color: #eaebed;
        text-align: center;
      }
      .header img {
        width: 200px;
        display: block;
        margin: 0 auto;
      }
      .header h1 {
        color: #e1e661;
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .content {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        padding: 20px;
        border-top: 6px solid #e1e661;
        background-color: #0e0d0d;
      }
      .job-listing {
        background-color: #000;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        text-align: left;
      }
      .job-listing h2 {
        color: #e1e661;
        font-size: 20px;
        margin: 0 0 10px;
      }
      .job-listing p {
        color: #d1d1d1;
        margin: 0 0 10px;
        font-size: 0.875rem;
      }
      .job-listing a {
        color: #e1e661;
        text-decoration: none;
        font-weight: 500;
      }
      .job-listing a:hover {
        text-decoration: underline;
      }
      .button-container {
        text-align: center;
      }
      .button-container a {
        background-color: #e1e661;
        color: #030712;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        text-decoration: none;
        font-weight: 700;
        display: inline-block;
      }
      .button-container a:hover {
        background-color: #d4d556;
      }
      .footer {
        padding: 10px;
        font-size: 0.875rem;
        text-align: center;
        background-color: #030712;
        color: #eaebed;
        opacity: 0.6;
      }
      .footer a {
        color: #e1e661;
        font-weight: 500;
        text-decoration: none;
        margin-left: 10px;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="body"
    >
      <tr>
        <td class="container">
          <div class="header">
            <img src="https://www.careerbooster.ai/dark_logo.png" alt="Company Logo" />
            <h1>Job Opportunities for You</h1>
          </div>
          <div class="content">
            {{ jobs }}
          </div>
          <div class="button-container">
            <a href="https://www.careerbooster.ai/ai-job-board" target="_blank">See All Jobs</a>
          </div>
          <div class="footer">
            <p>23 The Atria 219 Bath Road Slough SL1 4BF, United Kingdom</p>
            <p>+44 7933 951034</p>
            <p>
              Looking for more opportunities?<a class="contact-link" href="https://www.careerbooster.ai/ai-job-board" target="_blank">Visit our job board</a>
            </p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>

`;

export async function GET() {
  try {
    await startDB();

    // Get the current date and time
    const now = new Date();

    // Calculate the date and time 24 hours ago
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Query to find jobs created in the last day

    // Step 1: Group profiles by industry
    const jobProfiles = await User.aggregate([
      { $match: { industry: { $exists: true, $ne: "" } } },
      { $project: { email: 1, industry: 1 } },
    ]);

    // Step 2: Create a map to store emails by industry
    const industryEmailsMap = {};

    jobProfiles.forEach((profile) => {
      if (!industryEmailsMap[profile.industry]) {
        industryEmailsMap[profile.industry] = [];
      }
      industryEmailsMap[profile.industry].push(profile.email);
    });

    // Step 3: Fetch jobs and send emails per industry
    for (const industry in industryEmailsMap) {
      const latestJobs = await Job.aggregate([
        {
          $match: {
            createdAt: { $gte: oneDayAgo },
            category: industry,
          },
        },
        { $project: { jobTitle: 1, location: 1, employer: 1 } },
      ]);

      if (latestJobs.length > 0) {
        const totalNewJobs = latestJobs.length > 5 ? 5 : latestJobs.length;

        let html = "";
        for (let i = 0; i < totalNewJobs; i++) {
          html += `<div class="job-listing">
        <h2>${latestJobs[i].jobTitle}</h2>
        <p>${latestJobs[i].employer} - ${latestJobs[i].location}</p>
        <a href="https://www.careerbooster.ai/ai-job-board/${latestJobs[i]._id}">View Job</a>
      </div>`;
        }
        email_template = email_template.replace("{{ jobs }}", html);
        const senderEmail = process.env.SENDER_EMAIL;
        let transporter = nodemailer.createTransport({
          host: "smtp-relay.brevo.com",
          port: 587,
          secure: false,
          auth: {
            user: senderEmail,
            pass: process.env.SMTP_API_KEY,
          },
        });

        await transporter.sendMail({
          from: senderEmail,
          to: industryEmailsMap[industry].join(","),
          subject: `Job Opportunities from CareerBooster.AI`,
          html: email_template,
        });
      }
    }

    return NextResponse.json(
      { result: "emails sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
