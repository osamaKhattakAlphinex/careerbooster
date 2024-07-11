import React from "react";
import PageHeader from "@/components/PageHeader";
import ExecutiveRecruitment from "@/components/public-pages/Homepage/ExecutiveRecruitment";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Executive Recruitment - CareerBooster.ai",
  description: "Executive Recruitment Service Page",
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
    <main className="pt-5 bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="Executive Recruitment Service" />
      <ExecutiveRecruitment />
    </main>
  );
}

export default page;
