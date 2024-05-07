import JobCard from "@/components/public-pages/find-jobs/JobCard";
import JobSearchForm from "@/components/public-pages/find-jobs/JobSearchForm";
import { eyeIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

export default function FindJobsPage() {
  return (
    <>
      <main className="flex-grow-1 pb-20 pt-[120px]">
        <JobSearchForm />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </main>
    </>
  );
}
