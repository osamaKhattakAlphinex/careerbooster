"use client"
import AiToolsCard from "@/components/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/dashboard/RecentDocumentsCard";
import DashboardBot from "@/components/dashboard/DashboardBot";
import { useTourContext } from "@/context/TourContext";

// new version (dashboard design)

const Dashboard = () => {
  const { contentScrollRef } = useTourContext();
  return (
    <div ref={(ref: any)=> contentScrollRef.current = ref} className="w-full sm:w-full z-1000 ">
      <div className="ml-0 mt-0 lg:ml-[234px] px-[15px] lg:mb-[72px] ">
        <RecentDocumentsCard />
        <AiToolsCard />
      </div>
      <DashboardBot />
      {/* <Avatar /> */}
    </div>
  );
};

export default Dashboard;
