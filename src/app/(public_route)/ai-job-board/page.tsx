"use client";
import PageHeader from "@/components/PageHeader";
import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
import Employers from "@/components/public-pages/job-board/Employers";
import JobSeekers from "@/components/public-pages/job-board/JobSeekers";
import UniqueFeatures from "@/components/public-pages/job-board/UniqueFeatures";
import ResumeUploader from "@/components/public-pages/test-job-board/ResumeUploader";
import SuggestionCard from "@/components/public-pages/test-job-board/SuggestionCard";
import { useState } from "react";

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
  const [aiResumeSuggestions, setAiResumeSuggestions] = useState<string[]>([]);
  return (
    <main className="pt-5 flex-grow-1 pb-20 bg-[#fff] dark:bg-[#171825]">
      <PageHeader title="AI-Powered Job Board" beta={true}/>
      <JobSearchForm
        singleCategory={singleCategory}
        setSingleCategory={setSingleCategory}
      />
      <ResumeUploader
        setAiResumeKeywords={setAiResumeKeywords}
        setAiResumeSuggestions={setAiResumeSuggestions}
      />
      <JobCard
        singleCategory={singleCategory}
        query={query}
        locationQuery={locationQuery}
        aiResumeKeywords={aiResumeKeywords}
      />
      {(aiResumeSuggestions && aiResumeSuggestions.length > 0) && (
        <SuggestionCard aiResumeSuggestions={aiResumeSuggestions} />
      )}
    </main>
  );
}
