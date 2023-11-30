import AiToolsCard from "@/components/new-dashboard/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/new-dashboard/dashboard/RecentDocumentsCard";

const Dashboard = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[244px] px-[15px] lg:mb-[72px] ">
        <RecentDocumentsCard />
        <AiToolsCard />
        {/* <GenerateResume /> */}
      </div>
    </div>
  );
};

export default Dashboard;
