"use client";
import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
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
    <main className="flex-grow-1 pb-20 pt-[160px]">
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
