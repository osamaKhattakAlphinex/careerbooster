import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";
import ToolsCard from "@/components/dashboard/ToolsCard";
import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";
import RecentResumeCard from "@/components/dashboard/resume-creator/RecenResumesCard";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-4  mb-30 pl-20">
      <div className="flex flex-col gap-4 lg:py-0 mt-6">
        <ProfileCompletionAlert />
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
