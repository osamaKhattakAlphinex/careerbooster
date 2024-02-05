"use client";
import { useTourContext } from "@/context/TourContext";
import ResumeMaker from "./ResumeMaker";
import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";

const RecentDocumentsCard = () => {
  const { dashboardRef, innerToolsRef } = useTourContext();

  return (
    <>
      <ProfileCompletionAlert />
      <div
        ref={(ref: any) => (dashboardRef.current = ref)}
        className="mt-5 p-1 "
      >
        <div
          ref={(ref: any) => (innerToolsRef.current = ref)}
          className=" p-2 "
        >
          <h1 className="pb-2 rounded-[14px] dark:text-zinc-500 text-indigo-500  font-bold uppercase text-[14px] lg:pl-0 pl-5 lg:mt-0 ">
            career booster ai tools
          </h1>
          <div className="flex mt-5">
            <ResumeMaker />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentDocumentsCard;
