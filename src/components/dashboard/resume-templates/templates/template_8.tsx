"use client";
import { memo, useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";

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
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import useHandler from "@/hooks/useHandler";
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
import template_4 from "./template_4";
import Education from "./resume-sections/education";
import Publication from "./resume-sections/publication";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Project from "./resume-sections/project";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
const ResumeTemplate8 = () => {
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();

  const [newAchievement, setNewAchievement] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");

  //add new code

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  //New code end

  const [insideIndex, setInsideIndex] = useState<number>(0);
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

  return (
    <div className="w-full text-gray-900 first-page">
      <div className="flex">
        <div className="flex flex-col items-center w-full px-8 pt-4">
          <div className="flex w-[100%] justify-between items-center">
            <div className="flex flex-col md:w-[55%] xs:w-auto ">
              <Header
                name={resume.name}
                jobTitle={resume.jobTitle}
                fullNameStyle="fullName-temp-2"
                jobTitleStyle="jobTitle-temp-2"
              />
            </div>
            <div className="flex flex-col w-[35%]">
              <Contact
                contact={resume.contact}
                contactStyle="flex flex-col justify-between w-full gap-3 pl-0 mt-8 mb-4 text-xs break-all md:flex-col"
                contactStyle_li="
                flex flex-row items-start justify-start gap-1 hover:shadow-md hover:bg-gray-100
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-full px-8 xs:px-4 md:px-8 lg:px-8">
          {/* Executive Summary */}

          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            customStyle={{ borderTopBottom: true, centerHeading: true }}
            headingStyle="summaryHeading-temp-2"
            textStyle="summaryText-temp-2"
          />

          {/* Skills */}

          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            skillHeading="text-base font-semibold my-1 flex justify-center text-center uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 items-center gap-2"
            skill_ul="!list-disc border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%]  mb-4 text-xs"
            skill_li="!list-disc hover:shadow-md w-[30%] xs:w-[45%] xs:pr-4 md:w-[30%] hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center"
            skillNewStyle="skill-New-temp-2"
            customStyle={{ borderTopBottom: true, centerHeading: true }}
          />
          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            styles={template_2}
            customStyle={{ borderTopBottom: true, centerHeading: true }}
          />
          {/* Publications */}
          {resume?.publications && resume?.publications.length > 0 && (
            <Publication
              customStyle={{ borderTopBottom: false, centerHeading: true }}
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
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
              />
            )}
          </div>

          {/* Projects */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                heading={resume.headings.projects}
                projects={resume.projects}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                heading={resume.headings.awards}
                awards={resume.awards}
              />
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                heading={resume.headings.interests}
                interests={resume.interests}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                customStyle={{ borderTopBottom: false, centerHeading: true }}
                heading={resume.headings.references}
                references={resume.references}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                customStyle={{ borderTopBottom: false, centerHeading: true }}
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
              customStyle={{ borderTopBottom: true, centerHeading: true }}
              heading={resume.headings.education}
              educations={resume.education}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(ResumeTemplate8);
