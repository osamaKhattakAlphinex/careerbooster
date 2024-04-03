"use client";
import AiToolsCard from "@/components/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/dashboard/RecentDocumentsCard";
import DashboardBot from "@/components/dashboard/DashboardBot";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTourContext } from "@/context/TourContext";

// new version (dashboard design)

const Dashboard = () => {
  const userData = useSelector((state: any) => state.userData);
  const { tourBotRef } = useTourContext();

  useEffect(() => {
    if (userData && userData?.tours) {
      if (!userData.tours.dashboard) {
        setTimeout(() => {
          tourBotRef?.current?.click();
        }, 500);
      }
    }
  }, [tourBotRef]);

  return (
    <div className="w-full sm:w-full z-1000 ">
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
