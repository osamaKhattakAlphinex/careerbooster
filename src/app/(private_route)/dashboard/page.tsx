import ToolsCard from "@/components/dashboard/ToolsCard";
import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";
import RecentResumeCard from "@/components/dashboard/resume-creator/RecenResumesCard";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-4 px-10 py-18 mt-10">
      <ToolsCard />
      <div className="flex flex-col gap-4 lg:py-0 mt-10">
        {/* <TrainBotCard /> */}
        <h5 className="mb-3 text-4xl font-bold  text-gray-900 md:text-4xl dark:text-white  ">
          Resumes
        </h5>
        <div className="flex gap-4">
          <UploadedFilesCard />
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <RecentResumeCard source="dashboard" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
