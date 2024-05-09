import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
import { eyeIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

export default function FindJobsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <main className="flex-grow-1 pb-20 pt-[120px]">
        <JobSearchForm />
        <JobCard query={query} />
      </main>
    </>
  );
}
