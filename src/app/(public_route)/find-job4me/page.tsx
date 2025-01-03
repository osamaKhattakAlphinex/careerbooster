import React from "react";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import FindJobs4Me from "@/components/public-pages/Homepage/FindJobs4Me";
export const metadata: Metadata = {
  title: "Find Job4Me - CareerBooster.ai",
  description: "Find Job4Me Service Page",
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
        <PageHeader title="Find Job4Me" />
        <FindJobs4Me />
      </main>
    
  );
}

export default page;
