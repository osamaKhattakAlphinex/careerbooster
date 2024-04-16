"use client";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import Contact from "./contact";
import {
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import EditableField from "@/components/dashboard/EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import Summary from "./summary";
import Experience from "./experience";
import useHandler from "@/hooks/useHandler";
import Education from "./education";

const ResumeTemplate2_New = () => {
  const resume = useSelector((state: any) => state.resume);
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  return (
    <div className="flex flex-col items-start justify-start w-full px-6 py-2 space-y-4 text-gray-900 first-page">
      {/* Name and Title */}
      <div className="flex flex-col items-center w-full px-8 py-4 mt-1 text-center bg-gray-300 rounded-xl">
        <Header name={resume.name} jobTitle={resume.jobTitle} />
      </div>
      {/* contacts */}
      <div className="relative w-full py-1">
        <Contact contact={resume.contact} />
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <Summary summary={resume.summary} heading={resume?.headings?.summary} />
      </div>
      {/* Skills  */}
      <span className=" text-rose-500"> Add Skills Later</span>

      {/* Work Experience */}
      <div className="flex flex-col w-full space-y-3">
        <h2 className="flex items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
          {resumeWorkExpIcon}
          <EditableField
            value={
              resume?.headings?.workExperienceArray
                ? resume.headings.workExperienceArray
                : "work experience"
            }
            style={{ width: "fit-content" }}
            onSave={(value: string) => {
              if (value !== resume?.headings?.workExperienceArray) {
                updateSaveHook.updateAndSaveHeadings({
                  workExperienceArray: value,
                });
              }
            }}
          />
        </h2>
        {resume?.workExperienceArray &&
        resume?.workExperienceArray.length > 0 ? (
          <>
            {resume?.workExperienceArray.map((rec: any, i: number) => {
              return <Experience i={i} rec={rec} key={i} />;
            })}
          </>
        ) : (
          <span className=" text-rose-500">Later</span>
          //   <div
          //     className="list-disc "
          //     dangerouslySetInnerHTML={{
          //       __html:
          //         resume?.workExperience !== ""
          //           ? resume?.workExperience
          //           : streamedJDData,
          //     }}
          //   ></div>
        )}
      </div>

      {/* Add Custom */}
      {/* <CustomResumeSection /> */}
      {/* Education */}
      <div className="w-full space-y-3 ">
        {resume?.education.length > 0 && (
          <>
            <h3 className="flex flex-row items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
              {resumeEductionIcon}

              <EditableField
                value={
                  resume?.headings?.education
                    ? resume.headings.education
                    : "education"
                }
                style={{ width: "fit-content" }}
                onSave={(value: string) => {
                  if (value !== resume?.headings?.education) {
                    updateSaveHook.updateAndSaveHeadings({
                      education: value,
                    });
                  }
                }}
              />
            </h3>
            <ul className="grid grid-cols-3 gap-2 xs:grid-cols-3 md:grid-cols-3 ">
              {resume?.education.map((education: any, ind: number) => (
                <Education education={education} i={ind} key={ind} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplate2_New;
