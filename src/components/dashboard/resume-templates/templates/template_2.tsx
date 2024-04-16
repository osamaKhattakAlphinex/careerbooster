"use client";
import { memo, useEffect, useState } from "react";
import { Education as EducationType } from "@/store/userDataSlice";
import React from "react";
import { useSelector } from "react-redux";

import {
  crossIcon1,
  educationIcon,
  emailIcon,
  linkedInIcon,
  phoneIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import Toolbar from "@/components/dashboard/Toolbar";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import { ColorResult } from "react-color";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import AddItemToCustomSection from "../../resume-builder/AddItemToCustomSection";
import CustomResumeSection from "../../resume-builder/CustomResumeSection";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Language from "./resume-sections/language";
import Reference from "./resume-sections/reference";
import Interest from "./resume-sections/interest";
import Award from "./resume-sections/award";
import Training from "./resume-sections/trainings";
import Contact from "./resume-sections/contact";
import Education from "./resume-sections/education";
import Experience from "./resume-sections/experience";
import Skill from "./resume-sections/skills";
import Summary from "./resume-sections/summary";
import Header from "./resume-sections/header";

const ResumeTemplate2 = () => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const [insideIndex, setInsideIndex] = useState<number>(0);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const [streamedSummaryData, setStreamedSummaryData] = useState("");

  const [color, setColor] = useState("#e9e8e8");
  const [color_second, setColor_second] = useState("#e9e8e8");
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();
  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();

  useEffect(() => {
    if (streamedJDData === "") {
      setStreamedJDData(null);
      setRegeneratedRecordIndex(null);
    }
  }, [streamedJDData]);

  // handle regenrate
  const handleRegenrate = (rec: any, i: number) => {
    getOneWorkExperienceNew(rec);
    setRegeneratedRecordIndex(i);
  };

  //add Skills
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };

  //save skills
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  const saveColor = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor(color.hex);

    // You can do whatever you need with the selected color here
  };
  const saveColor_second = (color: ColorResult) => {
    // Access the selected color value from the 'color' parameter
    setColor_second(color.hex);

    // You can do whatever you need with the selected color here
  };
  return (
    <div className="flex flex-col py-2 items-start justify-start w-full px-6 space-y-4 text-gray-900 first-page">
      {/* Name and Title */}
      <div className="flex flex-col items-center w-full px-8 py-4 mt-1 text-center bg-gray-300  rounded-xl">
      <Header name={resume.name} jobTitle={resume.jobTitle} />
        {/* <div className="absolute top-0 left-12">
          <ColorPicker
            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[6px]  -left-5"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor}
          />
        </div> */}
      </div>
      {/* contacts */}
      <div className="relative w-full py-1">
        <Contact contact={resume.contact} />
        {/* <div className="absolute top-0 left-12">
          <ColorPicker
            defaultColor="#e9e8e8"
            resetColor="#e9e8e8"
            setColor={setColor}
            styles_pin="relative top-[18px]  -left-9"
            styles_div="absolute top-3 left-0"
            secondDefaultColor="#e9e8e8"
            setColor_second={setColor_second}
            saveColor={saveColor_second}
          />
        </div> */}
      </div>
      {/* summary objective */}
      <div className="w-full space-y-3 ">
        <Summary heading={resume.headings.summary} summary={resume.summary}/>
      </div>
      {/* Skills  */}
      <div className="w-full space-y-3">
        {resume?.primarySkills && resume?.primarySkills.length > 0 && (
          <h2 className="my-1 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 flex items-center gap-2">
            {resumeSkillsIcon}
            <EditableField
              value={
                resume?.headings?.primarySkills
                  ? resume.headings.primarySkills
                  : "Skills"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.primarySkills) {
                  updateSaveHook.updateAndSaveHeadings({
                    primarySkills: value,
                  });
                }
              }}
            />
          </h2>
        )}
        {resume?.primarySkills &&
        resume?.primarySkills.length > 0 &&
        !regenerating ? (
         <Skill skills={resume.primarySkills} setRegenerating={setRegenerating}/>
        ) : (
          <div className="text-center">
            <div role="status">
              <Loader />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className="flex flex-col w-full space-y-3">
        <h2 className="text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 flex items-center gap-2 ">
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
              return <Experience i={i} rec={rec} />;
            })}
          </>
        ) : (
          <div
            className="list-disc "
            dangerouslySetInnerHTML={{
              __html:
                resume?.workExperience !== ""
                  ? resume?.workExperience
                  : streamedJDData,
            }}
          ></div>
        )}
      </div>

      {/* Publications */}
      {resume?.publications && resume?.publications.length > 0 && (
        <>
          <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500 mt-3"></span>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase border-2 border-transparent md:my-1 md:text-base hover:border-dashed hover:border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v11.75A2.75 2.75 0 0 0 16.75 18h-12A2.75 2.75 0 0 1 2 15.25V3.5Zm3.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 3a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 5.75A.75.75 0 0 1 5.75 5h4.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 8.25v-2.5Z"
                clipRule="evenodd"
              />
              <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 1 0 2.5 0V8a1.5 1.5 0 0 0-1.5-1.5Z" />
            </svg>

            <EditableField
              value={
                resume?.headings?.publications
                  ? resume.headings.publications
                  : "publications"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.publications) {
                  updateSaveHook.updateAndSaveHeadings({
                    publications: value,
                  });
                }
              }}
            />
          </h3>
          <span className="!block border-stylee w-full h-0 border-[1px] !border-gray-500"></span>
          {resume?.publications.map((rec: any, i: number) => {
            return <Publication i={i} rec={rec} />;
          })}
        </>
      )}

      {/* Certificates */}
      {resume?.certifications && resume?.certifications.length > 0 && (
        <Certification heading={resume.headings.certifications} certificates={resume.certifications}/>
      )}

      {/* Trainings */}
      {resume?.trainings && resume?.trainings.length > 0 && (
        <Training heading={resume.headings.trainings} trainings={resume.trainings}/>
      )}

      {/* Awards */}
      {resume?.awards && resume?.awards.length > 0 && (
       <Award heading={resume.headings.awards} awards={resume.awards}/>
      )}

      {/* Interests & Hobbies */}
      {resume?.interests && resume?.interests.length > 0 && (
        <Interest heading={resume.headings.interests} interests={resume.interests}/>
      )}

      {/* References */}
      {resume?.references && resume?.references.length > 0 && (
        <Reference heading={resume.headings.references} references={resume.references} />
      )}

      {/* Languages */}
      {resume?.languages && resume?.languages.length > 0 && (
       <Language heading={resume.headings.languages} languages={resume.languages}/>
      )}

      {/* Add Custom */}
      {/* <CustomResumeSection /> */}

      {/* Education */}
      <div className="w-full space-y-3 ">
        {resume?.education.length > 0 && (
          <Education heading={resume.headings.education} educations={resume.education}/>         
        )}
      </div>
    </div>
  );
};
export default memo(ResumeTemplate2);
