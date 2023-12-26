"use client";
import { ALL_TEMPLATES } from "@/components/new-dashboard/dashboard/resume-templates";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import RecentResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";
import { useSelector } from "react-redux";

const Template = () => {
  const params = useSearchParams();
  const resumeData = useSelector((state: any) => state.resume);

  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef(null);
  return (
    <div className="ml-[234px] ">
      <RecentResumeCard componentRef={componentRef} />
      {resumeData &&
        (resumeData?.name ||
          resumeData?.contact?.email ||
          resumeData?.summary) && (
          <div ref={componentRef} className="bg-white">
            {ALL_TEMPLATES[templateId - 1].template({})}
          </div>
        )}
    </div>
  );
};

export default Template;
