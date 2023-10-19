import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";
import ToolsCard from "@/components/dashboard/ToolsCard";
// import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import RecentResumeCard from "@/components/dashboard/resume-builder/RecenResumesCard";

const Dashboard = () => {
  return (
    <section className="dashborad admin-dashboard flex flex-col gap-4  pb-30 pl-20">
      <div className="flex flex-col gap-4 py-30">
        <ProfileCompletionAlert />
        <WelcomeCard />

        <div className="flex gap-4">
          <UploadedFilesCard />
          <div className="w-full toolscard  border border-gray-200 rounded-lg shadow sm:p-6 mr-10 ">
            <RecentResumeCard source="dashboard" />
          </div>
        </div>
      </div>

      <div className="">
        <ToolsCard />
      </div>
    </section>
  );
};

export default Dashboard;
