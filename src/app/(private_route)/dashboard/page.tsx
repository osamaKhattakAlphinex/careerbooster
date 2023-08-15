import ToolsCard from "@/components/dashboard/ToolsCard";
import TrainBotCard from "@/components/dashboard/TrainBotCard";
import UploadedFilesCard from "@/components/dashboard/UploadedFilesCard";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-4 px-6 py-18">
      <div className="flex flex-row   gap-4 lg:py-0 mt-10">
        <TrainBotCard />
        <UploadedFilesCard />
      </div>
      <ToolsCard />
    </section>
  );
};

export default Dashboard;
