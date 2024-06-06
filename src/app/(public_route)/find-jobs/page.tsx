import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs - CareerBooster.ai",
  description: "Jobs - CareerBooster.ai | Developed by NausalTech",
};

export default function FindJobsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    location?: any;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const locationQuery = searchParams?.location || "";

  return (
    <>
      <main className="flex-grow-1 pb-20 pt-[120px]">
        <JobSearchForm />
        <JobCard query={query} locationQuery={locationQuery} />
      </main>
    </>
  );
}
