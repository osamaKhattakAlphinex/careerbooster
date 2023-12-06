import AiToolsCard from "@/components/new-dashboard/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/new-dashboard/dashboard/RecentDocumentsCard";
// new version (dashboard design and styles fixes)
const Dashboard = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 mt-0 lg:ml-[244px] px-[15px] lg:mb-[72px] ">
        <RecentDocumentsCard />
        <AiToolsCard />
      </div>
    </div>
  );
};

export default Dashboard;
