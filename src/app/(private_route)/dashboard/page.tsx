"use client";
import AiToolsCard from "@/components/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/dashboard/RecentDocumentsCard";
import Avatar from "@/components/Avatar";
import DashboardBot from "@/components/dashboard/DashboardBot";
import { useEffect } from "react";
import { useTourContext } from "@/context/TourContext";
// new version (dashboard design)

const Dashboard = () => {
  // const { outerContainerRef, dashboardElementRef } = useTourContext();
  // useEffect(() => {
  //   const element = document.getElementById("dashboard");
  //   const parentElement = element?.parentElement;
  //   const parentPosition: any = parentElement?.getBoundingClientRect();
  //   if (element) {
  //     const position = element.getBoundingClientRect();
  //     console.log(position);
  //     const newDiv = document.createElement("div");
  //     const overlay: any = document.getElementById("overlay");
  //     const overlayInner: any = document.getElementById("overlayInner");
  //     overlayInner.innerText = "";
  //     overlayInner?.appendChild(newDiv);
  //     newDiv.innerHTML = element.innerHTML;
  //     // newDiv.innerHTML = element.innerText;
  //     newDiv.className = element.classList.value;
  //     newDiv.classList.add("z-20");
  //     newDiv.classList.add("mt-[1.25rem]");
  //     newDiv.style.position = "absolute";
  //     newDiv.style.top = position.top - parentPosition.top + "px";
  //     newDiv.style.bottom = position.bottom - parentPosition.bottom + "px";
  //     newDiv.style.left = position.left - parentPosition.left + "px";
  //     newDiv.style.right = position.right - parentPosition.right + "px";
  //     newDiv.style.width = position.width + "px";
  //     newDiv.style.height = position.height + "px";
  //     console.log(newDiv);
  //   }
  // }, []);
  const { dashboardRef } = useTourContext();
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div
        ref={(ref: any) => (dashboardRef.current = ref)}
        className="ml-0 mt-0 lg:ml-[234px] px-[15px] lg:mb-[72px] "
      >
        {/* <div
          id="overlay"
          className="fixed z-10 w-screen h-screen pointer-events-none bg-black/90"
        >
          <div id="overlayInner" className="relative"></div>
        </div> */}

        <RecentDocumentsCard />
        <AiToolsCard />
      </div>
      <DashboardBot />
      {/* <Avatar /> */}
    </div>
  );
};

export default Dashboard;
