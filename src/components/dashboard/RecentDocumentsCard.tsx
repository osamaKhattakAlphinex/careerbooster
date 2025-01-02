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
        className="md:mt-5 xs:mt-0 md:p-1 xs:p-0 "
      >
        <div
          ref={(ref: any) => (innerToolsRef.current = ref)}
          className=" md:p-2 xs:p-0"
        >
          <h1 className="md:pb-2 xs:pb-0 rounded-[14px] dark:text-zinc-500 text-indigo-500  font-bold uppercase text-[14px] lg:pl-0 md:text-left xs:text-center lg:mt-0 ">
            career booster ai tools
          </h1>
          <div className="flex md:mt-5 xs:mt-3">
            <ResumeMaker />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentDocumentsCard;
