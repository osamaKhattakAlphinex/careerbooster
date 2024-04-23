"use client";
import { memo, useEffect, useState } from "react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setField } from "@/store/resumeSlice";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import useGetSummary from "@/hooks/useGetSummary";
import Toolbar from "@/components/dashboard/Toolbar";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import { ColorResult } from "react-color";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Summary from "./resume-sections/summary";
import Skill from "./resume-sections/skills";
import Experience from "./resume-sections/experience";
import {
  certification,
  publicationStyles,
  template_2,
} from "@/helpers/templateStylesObj";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Project from "./resume-sections/project";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Education from "./resume-sections/education";

const ResumeTemplate9 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();
  const [newAchievement, setNewAchievement] = useState("");

  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [insideIndex, setInsideIndex] = useState<number>(0);

  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);

  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();
  const userData = useSelector((state: any) => state.userData);

  //add new code

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  //New code end

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

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#1a202c");
  // const saveColor = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);

  // You can do whatever you need with the selected color here
  // };
  return (
    <div className="w-full text-gray-900 first-page">
      <div className="flex flex-row items-center justify-between px-8 pt-2 xs:pt-4">
        <div className="flex flex-col py-2">
          <Header
            name={resume.name}
            jobTitle={resume.jobTitle}
            fullNameStyle="fullName-temp-2"
            jobTitleStyle="jobTitle-temp-2"
          />
        </div>
        <div
          className="relative flex items-center bg-[#1a202c] hover:text-black justify-center mx-4 my-2 text-center text-white rounded-full w-28 h-28 xs:w-32 xs:h-32 md:w-32 md:h-32 md:my-0"
          // style={{ backgroundColor: color }}
        >
          <span className="text-4xl font-semibold text-gray-100 hover:shadow-md hover:text-black hover:bg-gray-100">
            <EditableField
              value={resume?.shortName ? resume?.shortName : "CPH"}
              style={{ width: "60px" }}
              onSave={(value: string) => {
                dispatch(setField({ name: "shortName", value: value }));
                saveResumeToDB({ ...resume, shortName: value });
              }}
            />
          </span>
          {/* <ColorPicker
            defaultColor="#1a202c"
            resetColor="#1a202c"
            styles_pin="absolute   top-4 right-5"
            styles_div="absolute top-3 -left-1"
            setColor={setColor}
            saveColor={saveColor}
          /> */}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 md:pl-8 xs:mt-4">
          {/* contacts */}

          <Contact
            contact={resume.contact}
            contactStyle="flex flex-row xs:flex-col justify-between w-full gap-3 pl-0 text-xs break-all md:flex-row"
            contactStyle_li="
                md:w-[20%] xs:w-full border-2 border-transparent hover:border-dashed hover:border-gray-500   hover:shadow-md hover:bg-gray-100 text-xs flex flex-row gap-1  items-center justify-start
                "
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}

          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            borderTopBottom={true}
            // centerHeading={true}
            headingStyle="summaryHeading-temp-2"
            textStyle="summaryText-temp-2"
          />
          {/* Skills */}

          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            borderTopBottom={true}
            // centerHeading={true}
            skillHeading="text-base font-semibold my-1 flex  text-center uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 items-center gap-2"
            skill_ul="!list-disc border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%]  mb-4 text-xs"
            skill_li="!list-disc hover:shadow-md w-[30%] xs:w-[45%] xs:pr-4 md:w-[30%] hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
            skillNewStyle="skill-New-temp-2"
          />

          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            borderTopBottom={true}
            styles={template_2}
            centerHeading={true}
          />
          {/* Publications */}
          {resume?.publications && resume?.publications.length > 0 && (
            <Publication
              heading={resume.headings.publications}
              publications={resume.publications}
              styles={publicationStyles}
            />
          )}
          {/* Certificates */}
          <div className="w-full">
            {resume?.certifications && resume?.certifications.length > 0 && (
              <Certification
                heading={resume.headings.certifications}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                heading={resume.headings.trainings}
                trainings={resume.trainings}
              />
            )}
          </div>

          {/* Projects */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                heading={resume.headings.projects}
                projects={resume.projects}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {resume?.awards && resume?.awards.length > 0 && (
              <Award heading={resume.headings.awards} awards={resume.awards} />
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                heading={resume.headings.interests}
                interests={resume.interests}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                heading={resume.headings.references}
                references={resume.references}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                heading={resume.headings.languages}
                languages={resume.languages}
              />
            )}
          </div>

          {/* Add Custom */}
          {/* <CustomResumeSection /> */}

          {/* Education */}
          {resume?.education.length > 0 && (
            <Education
              heading={resume.headings.education}
              educations={resume.education}
              borderTopBottom={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate9);
