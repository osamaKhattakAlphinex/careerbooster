import ToolsCard from "@/components/dashboard/ToolsCard";
import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";
import RecentResumeCard from "@/components/dashboard/resume-creator/RecenResumesCard";
import Link from "next/link";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-4  mb-30 pl-20">
      <div className="flex flex-col gap-4 lg:py-0 mt-6">
        <div
          className=" mb-3 inline-flex w-[96%] items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800 border"
          role="alert"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          It Seems that you have not completed your profile.{" "}
          <Link href="/welcome">
            Complete your profile to get better results
          </Link>
        </div>
        {/* <TrainBotCard /> */}
        <h5 className="mb-3 text-4xl font-bold   md:text-4xl dark:text-white  ">
          Resumes
        </h5>
        <div className="flex gap-4">
          <UploadedFilesCard />
          <div className="w-full  border border-gray-200 rounded-lg shadow sm:p-6 mr-10 ">
            <RecentResumeCard source="dashboard" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ToolsCard />
      </div>
    </section>
  );
};

export default Dashboard;
