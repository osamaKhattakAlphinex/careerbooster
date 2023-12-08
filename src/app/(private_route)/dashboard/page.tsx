import AiToolsCard from "@/components/new-dashboard/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/new-dashboard/dashboard/RecentDocumentsCard";
import Avatar from "@/components/utilities/Avatar";
// new version (dashboard design)
const Dashboard = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 mt-0 lg:ml-[234px] px-[15px] lg:mb-[72px] ">
        <RecentDocumentsCard />
        <AiToolsCard />
      </div>
      <Avatar />
    </div>
  );
};

export default Dashboard;
