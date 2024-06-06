import HeroArea from "@/components/public-pages/resume-scanner/HeroArea";
import JobDescHandler from "@/components/public-pages/resume-scanner/JobDescHandler";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Resume Scanner - CareerBooster.ai",
  description: "Resume Scanner - CareerBooster.ai | Developed by NausalTech",
};
const Page = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-r  from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900  overflow-x-hidden md:px-0">
        <HeroArea/>
        <JobDescHandler/>
    </section>
  );
};

export default Page;
