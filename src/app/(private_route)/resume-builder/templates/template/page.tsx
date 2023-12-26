"use client";
import { ALL_TEMPLATES } from "@/helpers/templateProvider";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import RecentResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";
import { useSelector } from "react-redux";

const Template = () => {
  const params = useSearchParams();
  const { resume } = useSelector((state: any) => state);

  const templateId: number = parseInt(params.get("templateId") || "0");
  const componentRef = useRef(null);

  return (
    <div className="lg:ml-[234px] ml-0 px-[15px]">
      <RecentResumeCard componentRef={componentRef} templateId={templateId} />
      <div className="my-10">
        {resume &&
          (resume?.name || resume?.contact?.email || resume?.summary) && (
            <div ref={componentRef} className=" bg-white">
              {ALL_TEMPLATES[templateId - 1].template({})}
            </div>
          )}
      </div>
    </div>
  );
};

export default Template;
