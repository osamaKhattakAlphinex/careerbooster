import React from "react";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Image from "next/image";
import ComingSoon from "@/components/public-pages/job-board/ComingSoon";
import UniqueFeatures from "@/components/public-pages/job-board/UniqueFeatures";
import JobSeekers from "@/components/public-pages/job-board/JobSeekers";
import Employers from "@/components/public-pages/job-board/Employers";
export const metadata: Metadata = {
  title: "Job Board - CareerBooster.ai",
  description: "Job Board Service Page",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "AI Resume Builder",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "CareerBooster.AI About ",
    "About CareerBooster.AI",
    "Contact CareerBooster.AI",
    "CareerBooster.AI Contact",
    "CareerBooster.AI Contact",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

function page() {
  return (
    <main className="bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="AI-Powered Job Board" />
      <div className="flex flex-col gap-8 justify-center xs:px-2 md:px-0 mt-10 pb-10">
        <ComingSoon />
        <UniqueFeatures />
        <JobSeekers />
        <Employers />
      </div>
    </main>
  );
}

export default page;
