"use client";
import { useSelector } from "react-redux";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { Resume } from "@/store/resumeSlice";

const RecentResumeCard = ({
  source = "",
  componentRef,
}: {
  source?: string;
  componentRef?: any;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

  return (
    <div className="w-full ">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl font-semibold  ">
          Your New Resumes (Generated by AI)
        </h2>
        {!resumes && <p>Loading Resumes...</p>}
        <div className="flex flex-wrap  gap-4 ">
          {resumes &&
            resumes.map((resume: Resume) => {
              if (resume.id) {
                return (
                  <div
                    key={resume.id}
                    className="max-w-[30%] sm:max-w-[50%] xs:max-w-full"
                  >
                    <SingleRecentResumeCard
                      key={resume.id}
                      resume={resume}
                      source={source}
                      componentRef={componentRef}
                    />
                  </div>
                );
              }
            })}
          {resumes && resumes.length === 0 && <p>No Recent Resumes found</p>}
        </div>
      </div>
    </div>
  );
};

export default RecentResumeCard;
