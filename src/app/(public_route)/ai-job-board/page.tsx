"use client";
import PageHeader from "@/components/PageHeader";
import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
import ResumeUploader from "@/components/public-pages/ai-job-board/ResumeUploader";
import { useState } from "react";
import Link from "next/link";

export default function JobBoard({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    location?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const [singleCategory, setSingleCategory] = useState("Choose a Category");
  const locationQuery = searchParams?.location || "";
  const [aiResumeKeywords, setAiResumeKeywords] = useState<string[]>([]);
  return (
    <main className="pt-5 flex-grow-1 pb-20 bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="AI-Powered Job Board" beta={true} />
      <JobSearchForm
        singleCategory={singleCategory}
        setSingleCategory={setSingleCategory}
      />

      <ResumeUploader setAiResumeKeywords={setAiResumeKeywords} />
      <JobCard
        singleCategory={singleCategory}
        query={query}
        locationQuery={locationQuery}
        aiResumeKeywords={aiResumeKeywords}
      />
      <div className="md:px-10  xs:px-4 ">
        <div className="w-full mb-3  flex flex-col justify-center items-center rounded-2xl mt-4 md:mt-14 bg-gradient-to-r to-fuchsia-600 from-indigo-500  border-gray-800 lg:px-10">
          <div className="lg:w-10/12 flex justify-center items-center flex-col lg:my-4 my-[28px] lg:mx-0 mx-5 ">
            <h3 className="lg:text-[35px] text-[16px] text-gray-100 text-normal text-center font-bold md:mt-2">
              Get Customized and Tailored Resumes for Your Jobs with Our Tool
            </h3>
            <p className="text-[12px] md:text-xl text-gray-100 text-normal text-center">
              Simply Upload your Existing Resume
            </p>
            <Link
              href="/register"
              className="bg-yellow-400 bg-opacity-80 mt-6 md:w-56 text-center rounded-full font-semibold text-[14px] md:text-lg hover:bg-yellow-600 text-gray-800 py-2 px-9"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
