"use client";
import { memo, useEffect, useState } from "react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwitterPicker, ColorResult } from "react-color";
import { setField } from "@/store/resumeSlice";
import Skill from "./resume-sections/skills";
import {
  crossIcon1,
  emailIcon,
  phoneIcon,
  resumeContactIcon,
  resumeEductionIcon,
  resumeSkillsIcon,
  resumeSummaryIcon,
  resumeWorkExpIcon,
} from "@/helpers/iconsProvider";
import Loader from "@/components/common/Loader";

import Toolbar from "@/components/dashboard/Toolbar";
import useGetSummary from "@/hooks/useGetSummary";
import EditableField from "@/components/dashboard/EditableField";
import useSingleJDGenerate from "@/hooks/useSingleJDGenerate";
import useSaveResumeToDB from "@/hooks/useSaveToDB";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

import useHandler from "@/hooks/useHandler";
import ColorPicker from "../colorPicker";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import Header from "./resume-sections/header";
import Contact from "./resume-sections/contact";
import Summary from "./resume-sections/summary";
import Experience from "./resume-sections/experience";

import Publication from "./resume-sections/publication";
import {
  certification,
  publicationStyles,
  template_2,
} from "@/helpers/templateStylesObj";
import Certification from "./resume-sections/certification";
import Training from "./resume-sections/trainings";
import Project from "./resume-sections/project";
import Award from "./resume-sections/award";
import Interest from "./resume-sections/interest";
import Reference from "./resume-sections/reference";
import Language from "./resume-sections/language";
import Education from "./resume-sections/education";
// import Skill from "./resume-sections/skills";

const ResumeTemplate4 = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state: any) => state.resume);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState<number>();

  const [newAchievement, setNewAchievement] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [regeneratedRecordIndex, setRegeneratedRecordIndex] = useState<
    number | null
  >(null);
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);
  const [streamedJDData, setStreamedJDData] = useState<any>("");
  const { saveResumeToDB } = useSaveResumeToDB();

  const { getOneWorkExperienceNew } = useSingleJDGenerate(setStreamedJDData);
  const { handleDropPrimary, handleDropAchievement, handleDropExperience } =
    useDragAndDrop();

  const [primarySkill, setPrimarySkill] = useState<string>("");

  const [insideIndex, setInsideIndex] = useState<number>(0);

  const { addPrimarySkill } = useAddPrimarySkill();
  const { updateSaveHook } = useUpdateAndSave();
  const { handlers } = useHandler();
  // const [color, setColor] = useState("#323B4C");
  // const [color_second, setColor_second] = useState("#1b1f27");

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
  const [confirmationModal, setConfirmationModal] = useState(false);
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
  // const saveColor = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor(color.hex);

  // You can do whatever you need with the selected color here
  // };
  // const saveColor_second = (color: ColorResult) => {
  // Access the selected color value from the 'color' parameter
  // setColor_second(color.hex);

  // You can do whatever you need with the selected color here
  // };
  return (
    <div className="first-page ">
      <div className="flex ">
        <div
          className="template4_sidebar"
          // style={{ backgroundColor: color }}
        >
          {/* <div className="w-full">
            <ColorPicker
              defaultColor="#323B4C"
              resetColor="#323B4C"
              setColor={setColor}
              styles_pin=" relative  right-0"
              styles_div="absolute top-4 left-48"
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor}
            />
          </div> */}
          <div
            // style={{ backgroundColor: color_second }}
            className="shortName"
          >
            <span className="shortName_Text">
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
              defaultColor="#323B4C"
              resetColor="#1b1f27"
              styles_pin="absolute  top-1 right-1"
              styles_div="absolute top-3 -left-1"
              setColor={setColor}
              secondDefaultColor="#1b1f27"
              setColor_second={setColor_second}
              saveColor={saveColor_second}
            /> */}
          </div>
          {/* contacts */}

          <h3 className="contact_heading">
            {resumeContactIcon}

            <EditableField
              value={
                resume?.headings?.contact ? resume.headings.contact : "contact"
              }
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== resume?.headings?.contact) {
                  updateSaveHook.updateAndSaveHeadings({
                    contact: value,
                  });
                }
              }}
            />
          </h3>
          <span className="bottom_border"></span>
          <Contact
            contact={resume.contact}
            contactStyle="contact_ul"
            contactStyle_li="contact_li"
          />

          {/* Skills */}
          <Skill
            heading={resume.headings.primarySkills}
            skills={resume.primarySkills}
            // centerHeading={true}
            skill_ul="skill_ul"
            skillHeading="skills_h3"
            skill_li="!list-disc
hover:shadow-md hover:cursor-move parent border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex  items-center gap-3
"
            skillNewStyle="skill-New-temp-2"
            borderTopBottom={true}
          />
        </div>
        <div className="template_right_section">
          <div className="flex flex-col ">
            <Header
              name={resume.name}
              jobTitle={resume.jobTitle}
              fullNameStyle="fullName-temp-2"
              jobTitleStyle="jobTitle-temp-2"
            />
          </div>
          {/* Executive Summary */}

          <Summary
            heading={resume.headings.summary}
            summary={resume.summary}
            borderTopBottom={true}
            // centerHeading={true}
            headingStyle="summaryHeading-temp-2"
            textStyle="summaryText-temp-2"
          />

          {/* Work Experience */}
          <Experience
            heading={resume.headings.workExperienceArray}
            workExperienceArray={resume.workExperienceArray}
            workExperience={resume.workExperience}
            borderTopBottom={true}
            styles={template_2}
            // centerHeading={true}
          />
          {/* Publications */}
          {resume?.publications && resume?.publications.length > 0 && (
            <Publication
              // centeredHeading={true}
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
                // centeredHeading={true}
                certificates={resume.certifications}
                styles={certification}
              />
            )}
          </div>

          {/* Trainings */}
          <div className="w-full">
            {resume?.trainings && resume?.trainings.length > 0 && (
              <Training
                // centeredHeading={true}
                heading={resume.headings.trainings}
                trainings={resume.trainings}
              />
            )}
          </div>

          {/* Projects */}
          <div className="w-full">
            {resume?.projects && resume?.projects.length > 0 && (
              <Project
                // centeredHeading={true}
                heading={resume.headings.projects}
                projects={resume.projects}
              />
            )}
          </div>

          {/* Awards */}
          <div className="w-full">
            {resume?.awards && resume?.awards.length > 0 && (
              <Award
                heading={resume.headings.awards}
                awards={resume.awards}
                // centeredHeading={true}
              />
            )}
          </div>

          {/* Interests & Hobbies */}
          <div className="w-full">
            {resume?.interests && resume?.interests.length > 0 && (
              <Interest
                heading={resume.headings.interests}
                interests={resume.interests}
                // centeredHeading={true}
              />
            )}
          </div>

          {/* References */}
          <div className="w-full">
            {resume?.references && resume?.references.length > 0 && (
              <Reference
                // centeredHeading={true}
                heading={resume.headings.references}
                references={resume.references}
              />
            )}
          </div>

          {/* Languages */}
          <div className="w-full">
            {resume?.languages && resume?.languages.length > 0 && (
              <Language
                // centeredHeading={true}
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
export default memo(ResumeTemplate4);
